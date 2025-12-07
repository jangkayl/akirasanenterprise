import { v2 as cloudinary } from "cloudinary";
import formidable, { File } from "formidable";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import { Readable } from "stream";

// REMOVED: export const config (Not used in App Router)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  // 1. Convert Web Stream to Node Buffer
  const buffers: Buffer[] = [];
  const webStream = req.body as ReadableStream<Uint8Array> | null;

  if (!webStream) {
    return new Response(JSON.stringify({ error: "No request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const reader = webStream.getReader();
  let result;
  while (!(result = await reader.read()).done) {
    buffers.push(Buffer.from(result.value));
  }
  const buffer = Buffer.concat(buffers);

  // 2. Mock Node.js Request for Formidable
  const fakeReq: any = new Readable();
  fakeReq.push(buffer);
  fakeReq.push(null);
  fakeReq.headers = Object.fromEntries(req.headers.entries());
  fakeReq.method = "POST";

  const form = formidable({ multiples: false });

  return new Promise<Response>((resolve) => {
    form.parse(fakeReq, async (err, fields, files) => {
      if (err) {
        console.error("Formidable error:", err);
        resolve(
          new Response(JSON.stringify({ error: "Error parsing file" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          })
        );
        return;
      }

      let fileObj: File | undefined;
      if (Array.isArray(files.file)) {
        fileObj = files.file[0];
      } else if (files.file) {
        fileObj = files.file as File;
      }

      if (!fileObj || !fileObj.filepath) {
        resolve(
          new Response(JSON.stringify({ error: "No file uploaded" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          })
        );
        return;
      }

      try {
        const result = await cloudinary.uploader.upload(fileObj.filepath, {
          format: "webp",
          folder: "AkirasanPosts",
        });

        // --- FIX: Revalidate INSIDE the success block ---
        // Added "max" as the second argument to fix the TS error
        revalidateTag("projects", "max");
        revalidatePath("/");
        revalidatePath("/akirasanadmin");

        resolve(
          new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          })
        );
      } catch (error: any) {
        console.error("Cloudinary upload error:", error?.message || error);
        resolve(
          new Response(
            JSON.stringify({ error: "Upload failed", details: error?.message || error }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          )
        );
      }
    });
  });
}

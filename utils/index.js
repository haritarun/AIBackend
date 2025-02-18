const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://killlxqohotmitxuydkv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpbGxseHFvaG90bWl0eHV5ZGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MTk2NDMsImV4cCI6MjA1NTM5NTY0M30.KexQjdLoSztYVGZ0RMs3a9Cbyqp-BVHmDN5eCJDtYH8';  // Replace with env variable
const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadBase64toImage(base64Data) {
    try {
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
        const buffer = Buffer.from(base64Data, "base64");

        const { data, error } = await supabase.storage.from("imageai").upload(`public/${fileName}.png`, buffer, {
            contentType: "image/png"
        });

        if (error) {
            console.error("Supabase upload error:", error);
            throw error;
        }

        const imageUrl = `${supabaseUrl}/storage/v1/object/public/imageai/public/${fileName}.png`;
        console.log("Generated Image URL:", imageUrl);

        return imageUrl;
    } catch (e) {
        console.error("Error in uploadBase64toImage:", e);
        return null;
    }
}

module.exports = { uploadBase64toImage };

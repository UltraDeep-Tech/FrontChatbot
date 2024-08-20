"use server"

export const getAudio = async (text: string) => {
    const url = "https://api.play.ht/api/v2/tts/stream";
    const options: any = {
        method: "POST",
        headers: {
            accept: "audio/mpeg",
            "content-type": "application/json",
            AUTHORIZATION: process.env.NEXT_PUBLIC_PLAYHT_APIKEY,
            "X-USER-ID": process.env.NEXT_PUBLIC_PLAYHT_USER,
        },
        body: JSON.stringify({
            voice_engine: 'PlayHT2.0-turbo',
            text: text,
            voice: "s3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json",
            output_format: "mp3",
            sample_rate: "24000",
            speed: 1,
        }),
    };

    const response = await fetch(url, options);
    return response.body; // Return audio data directly
}

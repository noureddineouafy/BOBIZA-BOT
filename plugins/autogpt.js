import fetch from 'node-fetch';

export async function before(m) {
    if (m.isBaileys) return false;
    let text = extractTextAfterKeyword(m.text)
    if (text) {
        try {
            let result = await gptGo(text)
            if (result) {
                await this.reply(m.chat, result, m);
            }
        } catch {
            await this.reply(m.chat, eror, m);
        }
    }
}

function extractTextAfterKeyword(input) {
    const regex = /^(gpt|nono|Gpt|chatgpt|Chatgpt)\s(.+)/;
    const match = input.match(regex);
    return match ? match[2] : null;
};

/* New Line */
async function gptGo(query) {
    const encodeQuery = encodeURIComponent(query)
    const tokenResponse = await fetch(`https://gptgo.ai/action_get_token.php?q=${encodeQuery}&hlgpt=ar`, {
        method: "GET",
        headers: {
            "Referer": "https://gptgo.ai/?hl=ar",
            "origin": "https://gptgo.ai/"
        }
    });

    const {
        token
    } = await tokenResponse.json();

    const response = await fetch(`https://gptgo.ai/action_ai_gpt.php?token=${token}`, {
        method: "GET",
        headers: {
            "Referer": "https://gptgo.ai/?hl=ar",
            "origin": "https://gptgo.ai/",
            "accept": "text/event-stream"
        }
    });

    const inputString = await response.text();
    const chunks = inputString.split("data:");
    let result = "";
    const doneKeyword = "[DONE]";

    for (let i = 1; i < chunks.length; i++) {
        const chunk = chunks[i].trim();
        const doneIndex = chunk.indexOf(doneKeyword);

        if (doneIndex !== -1) {
            // Exclude the part after [DONE]
            result += chunk.slice(0, doneIndex);
            break; // Stop processing further chunks
        }

        const contentIndex = chunk.indexOf('"content":"');
        if (contentIndex !== -1) {
            const startIndex = contentIndex + '"content":"'.length;
            const endIndex = chunk.indexOf('"', startIndex);
            if (endIndex !== -1) {
                const content = chunk.slice(startIndex, endIndex);
                result += content;
            }
        }
    }

    return result.replace(/\\n/g, '\n');
}

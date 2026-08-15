const NOAH_CONVERSATION_KEY = "noah_conversation";
const MAX_MESSAGES = 20;

function getConversation() {
    const savedConversation =
        localStorage.getItem(NOAH_CONVERSATION_KEY);

    if (!savedConversation) {
        return [];
    }

    try {
        return JSON.parse(savedConversation);
    } catch (error) {
        console.error(
            "Error leyendo la conversación de Noah:",
            error
        );

        return [];
    }
}

function saveConversation(conversation) {
    const limitedConversation =
        conversation.slice(-MAX_MESSAGES);

    localStorage.setItem(
        NOAH_CONVERSATION_KEY,
        JSON.stringify(limitedConversation)
    );
}

function addUserMessage(message) {
    const conversation = getConversation();

    conversation.push({
        role: "user",
        content: message,
        timestamp: new Date().toISOString()
    });

    saveConversation(conversation);
}

function addNoahMessage(message) {
    const conversation = getConversation();

    conversation.push({
        role: "noah",
        content: message,
        timestamp: new Date().toISOString()
    });

    saveConversation(conversation);
}

function getConversationHistory() {
    return getConversation();
}

function clearConversation() {
    localStorage.removeItem(NOAH_CONVERSATION_KEY);
}

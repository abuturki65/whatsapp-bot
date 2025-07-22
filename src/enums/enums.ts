export enum MessageRoles {
    BotOwner = "BOT_OWNER",
    GroupOwner = "GROUP_OWNER",
    GroupAdmin = "GROUP_ADMIN",
    GroupMember = "GROUP_MEMBER",
    Personal = "PERSONAL",
}

export enum MessageArea {
    GroupMessage = "GROUP_MESSAGE",
    PersonalMessage = "PERSONAL_MESSAGE",
}

export enum MessageType {
    TextMessage = "TEXT_MESSAGE",
    ImageMessage = "IMAGE_MESSAGE",
    VideoMessage = "VIDEO_MESSAGE",
    AudioMessage = "AUDIO_MESSAGE",
    DocumentMessage = "DOCUMENT_MESSAGE",
    QuotedMessage = "QUOTED_MESSAGE",
    ContactMessage = "CONTACT_MESSAGE",
    LocationMessage = "LOCATION_MESSAGE",
    StickerMessage = "STICKER_MESSAGE",
    ReactionMessage = "REACTION_MESSAGE",
}

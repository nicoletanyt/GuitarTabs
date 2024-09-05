export class Song {
    constructor(title, artist, tabs) {
        this.title = title
        this.artist = artist
        this.tabs = tabs
    }
}

export class Tab {
    constructor(lyric, notes) {
        this.lyric = lyric
        this.notes = notes
    }
}
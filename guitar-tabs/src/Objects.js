export class Song {
    constructor(title, artist, tabs, bpm, duration) {
        this.title = title
        this.artist = artist
        this.tabs = tabs
        this.bpm = bpm
        this.duration = duration
    }
}

export class Tab {
    constructor(lyric, notes) {
        this.lyric = lyric
        this.notes = notes
    }
}
class SteamGame{
    constructor(AppID, Abbrev, Developer, ReleaseDate, Publisher, Rating){
        this.AppID = AppID;
        this.Abbrev = Abbrev;
        this.Developer = Developer;
        this.ReleaseDate = ReleaseDate;
        this.Publisher = Publisher;
        this.Rating = Rating;
    }
}

module.exports = SteamGame;
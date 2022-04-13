class Run {
    constructor(RunTime, CategoryName, SubcategoryName, SubmittedByUserName, VerifiedByUserName, Placement, DatePlayed, DateVerified, IsObsolete, RunDescription){
        this.RunTime = RunTime;
        this.CategoryName = CategoryName;
        this.SubcategoryName = SubcategoryName;
        this.SubmittedByUserName = SubmittedByUserName;
        this.VerifiedByUserName = VerifiedByUserName;
        this.Placement = Placement;
        this.DatePlayed = DatePlayed;
        this.DateVerified = DateVerified;
        this.IsObsolete = IsObsolete;
        this.RunDescription = RunDescription;
    }
}

module.exports = Run;
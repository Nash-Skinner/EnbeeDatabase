CREATE DATABASE EnbeeDatabase;
USE EnbeeDatabase;
CREATE TABLE Game(
	Abbrev varchar(10),			
    Name varchar(10),
    Rules varchar(10),
    Platform varchar(10),
    ReleaseYear date,
    PRIMARY KEY (Abbrev));
                
CREATE TABLE SteamGame(
    AppID int NOT NULL,
    Abbrev varchar(10) NOT NULL,
    Developer varchar(10),
    ReleaseDate date,
    Publisher varchar(10),
    Rating varchar(10),
    NumberTotalPlayers varchar(10),
    NumberConcurrentWeeklyPlayers varchar(10),
    PRIMARY KEY (AppID),
    FOREIGN KEY (Abbrev) REFERENCES Game(Abbrev));

CREATE TABLE Category(
    CategoryName varchar(10) NOT NULL,
    Abbrev varchar(10) NOT NULL,
    Rules varchar(10),
    PRIMARY KEY (CategoryName),
    FOREIGN KEY (Abbrev) REFERENCES Game(Abbrev));
                
CREATE TABLE SubCategory(
    SubcategoryName varchar(10) NOT NULL,
    Abbrev varchar(10) NOT NULL,
    Rules varchar(10),
    PRIMARY KEY (SubcategoryName),
    FOREIGN KEY (Abbrev) REFERENCES Game(Abbrev));

CREATE TABLE Runner(
    Username varchar(10) NOT NULL,
    Region varchar(10),
    Pronouns varchar(10),
    JoinDate date,
    Primary Key (Username));
    
CREATE TABLE Run(
    RunTime time NOT NULL,
    CategoryName varChar(10) NOT NULL,
    SubcategoryName varChar(10) NOT NULL,
    SubmittedByUserName varchar(10) NOT NULL,
    VerifiedByUserName varchar(10) NOT NULL,
    Placement int,
    DatePlayed date,
    DateVerified date,
    IsObsolete bool,
    RunDescription varchar(10),
    Primary Key (RunTime),
    FOREIGN KEY (CategoryName) REFERENCES Category(CategoryName),
    FOREIGN KEY (SubcategoryName) REFERENCES Subcategory(SubcategoryName),
    FOREIGN KEY (SubmittedByUserName) REFERENCES Runner(Username),
    FOREIGN KEY (VerifiedByUserName) REFERENCES Runner(Username));

CREATE TABLE ModeratorFor(
    Abbrev varchar(10) NOT NULL,
    Username varchar(10) NOT NULL,
    FOREIGN KEY (Abbrev) REFERENCES Game(Abbrev),
    FOREIGN KEY (Username) REFERENCES Runner(Username));
    
CREATE TABLE PlayedBy(
    Username varchar(10) NOT NULL,
    RunTime time NOT NULL,
    SubmittedByUsername varchar(10) NOT NULL,
    CategoryName varchar(10) NOT NULL,
    SubcategoryName varchar(10) NOT NULL,
    FOREIGN Key (Username) REFERENCES Runner(Username),
    FOREIGN Key (RunTime) REFERENCES Run(RunTime),
    FOREIGN KEY (SubmittedByUserName) REFERENCES Runner(Username),
    FOREIGN KEY (CategoryName) REFERENCES Category(CategoryName),
    FOREIGN KEY (SubcategoryName) REFERENCES Subcategory(SubcategoryName));
                
                
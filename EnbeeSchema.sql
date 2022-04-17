CREATE DATABASE EnbeeDatabase;
USE EnbeeDatabase;

CREATE TABLE Game (
	gameId varchar(20) NOT NULL,
	abbrev varchar(20) NOT NULL,			
    name varchar(20) NOT NULL,
    platforms varchar(20) NOT NULL,
    releaseYear YEAR NOT NULL,
	weblink varchar(20) NOT NULL,
    PRIMARY KEY (gameId)
);
                
CREATE TABLE SteamGame (
    appId int NOT NULL,
    srdcGameId varchar(20) NOT NULL,
    developer varchar(20) NULL,
    releaseDate DATE NULL,
    publisher varchar(20) NULL,
    rating varchar(20) NULL,
    PRIMARY KEY (appId),
    FOREIGN KEY (srdcGameId) REFERENCES Game(gameId)
);

CREATE TABLE Category (
	gameId varchar(20) NOT NULL,
	categoryId varchar(20) NOT NULL,
    categoryName varchar(10) NULL,
    rules varchar(1000) NULL,
    PRIMARY KEY (gameId, categoryId),
    FOREIGN KEY (gameId) REFERENCES Game(gameId)
);

CREATE TABLE Runner (
	userId varchar(20) NOT NULL,
    username varchar(10) NOT NULL,
    region varchar(10) NULL,
    pronouns varchar(10) NULL,
    joinDate DATE NULL,
    PRIMARY KEY (userId)
);
    
CREATE TABLE Run (
	runId varchar(20) NOT NULL,
	gameId varchar(20) NOT NULL,
	categoryId varchar(20) NOT NULL,
	runTime TIME NOT NULL,
	placement int NULL,
	datePlayed DATE NULL,
	isObsolete BOOLEAN NULL,
	runDescription varchar(1000) NULL,
    PRIMARY KEY (runId, gameId, categoryId),
    FOREIGN KEY (gameId, categoryId) REFERENCES Category(gameId, categoryId)
);

CREATE TABLE ModeratorFor (
	gameId varchar(20) NOT NULL,
	userId varchar(20) NOT NULL,
	PRIMARY KEY(gameId, userId),
    FOREIGN KEY (gameId) REFERENCES Game(gameId),
    FOREIGN KEY (userId) REFERENCES Runner(userId)
);
    
CREATE TABLE PlayedBy (
	runId varchar(20) NOT NULL,
	gameId varchar(20) NOT NULL,
	categoryId varchar(20) NOT NULL,
	userId varchar(20) NOT NULL,
	PRIMARY KEY (runId, gameId, categoryId, userId),
	FOREIGN KEY (runId, gameId, categoryId) REFERENCES Run(runId, gameId, categoryId),
	FOREIGN KEY (userId) REFERENCES Runner(userId)
);
                
                
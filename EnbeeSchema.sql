CREATE DATABASE EnbeeDatabase;
USE EnbeeDatabase;

CREATE TABLE Game (
	gameId varchar(20) NOT NULL,
	abbrev varchar(20) NOT NULL,			
    name varchar(20) NOT NULL,
    releaseYear YEAR NOT NULL,
	weblink varchar(50) NOT NULL,
    PRIMARY KEY (gameId)
);
                
CREATE TABLE SteamGame (
    appId int NOT NULL,
    srdcGameId varchar(20) NOT NULL,
    developer varchar(50) NULL,
    releaseDate DATE NULL,
    publisher varchar(50) NULL,
    rating varchar(50) NULL,
    PRIMARY KEY (appId),
    FOREIGN KEY (srdcGameId) REFERENCES Game(gameId)
);

CREATE TABLE Category (
	gameId varchar(20) NOT NULL,
	categoryId varchar(20) NOT NULL,
    categoryName varchar(50) NULL,
    PRIMARY KEY (gameId, categoryId),
    FOREIGN KEY (gameId) REFERENCES Game(gameId) ON DELETE CASCADE
);

CREATE TABLE Variable (
	gameId varchar(20) NOT NULL,
	categoryId varchar(20) NOT NULL,
	variableId varchar(20) NOT NULL,
	variableValueId varchar(20) NOT NULL,
	variableName varchar(100) NULL,
	variableValue varchar(100) NULL,
	PRIMARY KEY (gameId, categoryId, variableId, variableValueId),
	FOREIGN KEY (gameId, categoryId) REFERENCES Category(gameId, categoryId) ON DELETE CASCADE
);

CREATE TABLE Runner (
	userId varchar(20) NOT NULL,
    username varchar(25) NULL,
    region varchar(25) NULL,
    joinDate DATE NULL,
    PRIMARY KEY (userId)
);
    
CREATE TABLE Run (
	runId varchar(20) NOT NULL,
	gameId varchar(20) NOT NULL,
	categoryId varchar(20) NOT NULL,
	runTime varchar(30) NOT NULL,
	placement int NULL,
	datePlayed DATE NULL,
    PRIMARY KEY (runId, gameId, categoryId),
    FOREIGN KEY (gameId, categoryId) REFERENCES Category(gameId, categoryId) ON DELETE CASCADE
);

CREATE TABLE RunHasVariable (
	runId varchar(20) NOT NULL,
	gameId varchar(20) NOT NULL,
	categoryId varchar(20) NOT NULL,
	variableId varchar(20) NOT NULL,
	variableValueId varchar(20) NOT NULL,
	PRIMARY KEY (runId, gameId, categoryId, variableId, variableValueId),
	FOREIGN KEY (runId, gameId, categoryId) REFERENCES Run(runId, gameId, categoryId) ON DELETE CASCADE,
	FOREIGN KEY (gameId, categoryId, variableId, variableValueId) REFERENCES Variable(gameId, categoryId, variableId, variableValueId) ON DELETE CASCADE
);
    
CREATE TABLE PlayedBy (
	runId varchar(20) NOT NULL,
	gameId varchar(20) NOT NULL,
	categoryId varchar(20) NOT NULL,
	userId varchar(20) NOT NULL,
	PRIMARY KEY (runId, gameId, categoryId, userId),
	FOREIGN KEY (runId, gameId, categoryId) REFERENCES Run(runId, gameId, categoryId) ON DELETE CASCADE,
	FOREIGN KEY (userId) REFERENCES Runner(userId) ON UPDATE CASCADE
);
                
                
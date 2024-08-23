const MODE = "STAGING"; // DEVELOPMENT , PRODUCTION , STAGING
const db = require("../models");
const Company = db.company;
const ContestsLog = db.contestsLog;
const Game = db.game;
const _ = require("lodash");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const config = require("../config/common.config");
const utility = require("../libs/utility");

const helper = {
  headers: function (req) {
    let apiHeader = {};
    if (
      req?.headers != undefined &&
      req?.headers["x-access-token"] != undefined
    ) {
      var accessCode = req.headers["x-access-token"];
    } else {
      var accessCode = "";
    }

    if (accessCode) {
      apiHeader["x-access-token"] =
        "gPenTvblIhzofuBIpLGJzbEh1v1qEZOI6qLIkpjdnTdyoOcm+6TI4f79VpuvBiVQHk+YjHantH2vMy1tP5NGmg==";
    }

    apiHeader["Access-Control-Allow-Origin"] = "*";
    apiHeader["Content-Type"] = "application/json";
    apiHeader["Accept"] = "application/json";

    return apiHeader;
  },
  headerForGoLive: async function (req, gameToken) {
    let apiHeader = {};
    apiHeader["Content-Type"] = "application/json";
    apiHeader["Accept"] = "application/json";
    apiHeader["Authorization"] = "Bearer " + gameToken;
    return apiHeader;
  },
  headersWithOutToken: function (req) {
    let apiHeader = {};

    // if (req?.headers != undefined && req?.headers["x-access-token"] != undefined) {
    //     var accessCode = req.headers["x-access-token"];
    // } else {
    //     var accessCode = "";
    // }

    // if (accessCode) {
    //     apiHeader['x-access-token'] = accessCode
    // }

    apiHeader["Access-Control-Allow-Origin"] = "*";
    apiHeader["Content-Type"] = "application/json";
    apiHeader["Accept"] = "application/json";

    return apiHeader;
  },
  viApiUrl: async function (req) {
    let API_BASE_URL = "http://127.0.0.1:9090/api/";

    if (
      req?.headers != undefined &&
      req?.headers["company-code"] != undefined
    ) {
      var companyCode = req.headers["company-code"];
    } else {
      var companyCode = req;
    }

    if (MODE === "PRODUCTION") {
      API_BASE_URL = "http://127.0.0.1:9090/api/";
    }

    if (MODE === "STAGING") {
      API_BASE_URL = "https://vi-api-staging.gamerji.cloud/api/";
    }

    let where = {
      code: new RegExp("^" + _.escapeRegExp(companyCode) + "$", "i"),
    };

    let companyData = await Company.findOne(where, { baseUrl: 1 }).exec();
    if (companyData?.baseUrl) {
      API_BASE_URL = companyData?.baseUrl;
    }
    //API_BASE_URL = 'http://127.0.0.1:9090/api/'

    return API_BASE_URL;
  },
  glanceApiUrl: async function (req) {
    let API_BASE_URL = "http://127.0.0.1:9090/api/";

    if (
      req?.headers != undefined &&
      req?.headers["company-code"] != undefined
    ) {
      var companyCode = req.headers["company-code"];
    } else {
      var companyCode = req;
    }

    if (MODE === "PRODUCTION") {
      API_BASE_URL = "http://127.0.0.1:9090/api/";
    }

    if (MODE === "STAGING") {
      API_BASE_URL = "http://35.154.8.149/glanceapi/api/";
    }

    let where = {
      code: new RegExp("^" + _.escapeRegExp(companyCode) + "$", "i"),
    };

    let companyData = await Company.findOne(where, { baseUrl: 1 }).exec();
    if (companyData?.baseUrl) {
      API_BASE_URL = companyData?.baseUrl;
    }
    //  API_BASE_URL = 'http://127.0.0.1:9090/api/'

    return API_BASE_URL;
  },
  gameByCompany: async function (req) {
    //  console.log("^^^^^^^^^^^^^^^^^",req.body)
    var companyCode = "",
      games = [];
    if (
      req?.headers != undefined &&
      req?.headers["company-code"] != undefined
    ) {
      companyCode = req.headers["company-code"];
    }
    if (companyCode == "NW") {
      // console.log('req.body?.search:', req.body?.search)

      // if (req.body?.search?.company) {
      //     var gameData = await Game.find({ isDeleted: false }).exec();

      //     var tempGameArr = [];
      //     gameData.forEach((element) => {
      //         games.push(element._id.toString());

      //     });
      //     // console.log('tempGameAr -===>:', tempGameArr)
      //     // console.log("req.body?.search?.company",req.body?.search?.company)
      //     // await Promise.all(req.body?.search?.company.map(async function (val) {
      //     //     let where = {
      //     //         _id: ObjectId(val),
      //     //     };
      //     //     var companyData = await Company.findOne(where).exec();
      //     //     // console.log('companyData?.games:', companyData?.games)
      //     //     if (companyData?.games) {

      //     //         games.filter((element) => {
      //     //             // check if the element
      //     //             // is present in arr2
      //     //             // and return the boolean value
      //     //             if(companyData?.games.includes(element.toString())) {
      //     //                 tempGameArr.push(element.toString())
      //     //             }
      //     //             // return companyData?.games.includes(element.toString());
      //     //         });
      //     //         // games.concat(tempdata);
      //     //         // console.log('games:', tempGameArr)

      //     //     }
      //     // }))

      //     let gamesList = [];
      //     var companyData = await Company.find({_id: {$in: req.body?.search?.company}}).select('games').exec();
      //   //  console.log("companyData",companyData)
      //     await Promise.all(companyData.map(async function (val) {
      //         await Promise.all(val?.games.map(async function (valGame) {
      //             gamesList.push(valGame)
      //         }))
      //     }))
      //    console.log("gamesList",gamesList)
      //     let gamesFinalList = gamesList;
      //     if(req.body.search.isGameList !== true){
      //         if(req.body.search.company.length > 1)
      //         {
      //             gamesFinalList = findDuplicates(gamesList)
      //         }
      //     }

      //      console.log("gamesFinalList",gamesFinalList)

      //     games = gamesFinalList;
      //     return gamesList;
      // }

      let gameArray = [],
        where = {};

      if (req.body?.search?.company) {
        // Find and populate games for each company
        const companies = await Company.find({
          _id: { $in: req.body?.search?.company },
        }).populate("games");

        // Get arrays of game IDs for each company
        const gameIdsArrays = companies.map((company) =>
          company.games.map((game) => game.toString())
        );

        // Find the common games
        const commonGameIds = gameIdsArrays.reduce((intersection, gameIds) => {
          return intersection.filter((commonId) => gameIds.includes(commonId));
        });

        // Populate and return the common games
        const commonGames = await Game.find({
          _id: { $in: commonGameIds },
        }).select("name");

        return commonGames;
      } else {
        let games = [];
        var gameData = await Game.find({ isDeleted: false }).exec();

        var tempGameArr = [];
        gameData.forEach((element) => {
          games.push(element._id.toString());
        });

        return games;
      }
    } else {
      let where = {
        code: new RegExp("^" + _.escapeRegExp(companyCode) + "$", "i"),
      };

      let companyData = await Company.findOne(where).exec();
      if (companyData?.games) {
        games = companyData?.games;
      }
      return games;
    }
  },

  getDatabaseClusterByCompany: function (companyCode) {
    let cluster = {};
    cluster.VI =
      "mongodb+srv://gamerjiV2User:QEl0jQdLNQOiuHxT@clusterdev.lgudf.mongodb.net/gamerjiV2DBDev?retryWrites=true&w=majority"; //staging
    cluster.GL =
      "mongodb+srv://gamerjiV2User:QEl0jQdLNQOiuHxT@clusterdev.lgudf.mongodb.net/glance?retryWrites=true&w=majority"; //staging
    cluster.GJ =
      "mongodb+srv://gamerjiV2User:QEl0jQdLNQOiuHxT@clusterdev.lgudf.mongodb.net/gamerjiV2DB2Dev?retryWrites=true&w=majority"; //staging

    // cluster.VI = 'mongodb+srv://gamerjiV2User21:uvb4Z6OjvP6xOCb7@viprodcluster.rfrdy.mongodb.net/viEsports?retryWrites=true&w=majority' //live
    // cluster.GL = 'mongodb+srv://gamerjiV2User:QEl0jQdLNQOiuHxT@clusterdev.lgudf.mongodb.net/glance?retryWrites=true&w=majority' //live
    // cluster.GJ = 'mongodb+srv://gamerjiV2User:QEl0jQdLNQOiuHxT@cluster0.lgudf.mongodb.net/gamerjiV2DB2?retryWrites=true&w=majority' //live

    return cluster[companyCode];
  },
  sumOfObject: function (obj) {
    var sum = 0;
    for (var el in obj) {
      if (obj.hasOwnProperty(el)) {
        if (Number(obj[el])) {
          sum += parseFloat(obj[el]);
        }
      }
    }
    return sum;
  },
  AWS_BASE_URL: "https://gamerji-uploads.s3.amazonaws.com/",
  GAME_DEFAULT_IMAGE:
    "https://gamerji-uploads.s3.amazonaws.com/632e92cecd46fcfb6cbcc444_1668014403678.jpg",
  CONTEST_DEFAULT_IMAGE:
    "https://gamerji-uploads.s3.amazonaws.com/632e92cecd46fcfb6cbcc444_1668014749297.jpg",
  getFirebaseTokenURL: () => {
    if (MODE == "STAGING") {
      return "https://gamerji-api-staging.gamerji.cloud/api/user/getFireBaseToken";
    } else if (MODE === "PRODUCTION") {
      return "https://api.gamerji.tech/api/user/getFireBaseToken";
    } else {
      return "https://gamerji-api-testing.gamerji.cloud/api/user/getFireBaseToken";
    }
  },

  getCompanyByUID: async (user_id) => {
    let company = [
      { name: "GJ", regex: /GSGJ/i },
      { name: "D11", regex: /GSDE/i },
      { name: "Vi", regex: /GSVI/i },
    ];

    let newCompnay = null;
    await Promise.all(
      company.map(async (comp) => {
        if (comp.regex.test(user_id) === true) {
          newCompnay = comp?.name;
        }
      })
    );

    return newCompnay;
  },






  contestLog: async function (req, data, operation, id) {
    //return true
    //console.log("CONTEST:::LOG:::--->data", data, "--->operation", operation)
    try {
      let re = utility.writeToS3({ data: data, id: id, operation: operation, date: new Date(), });
      console.log("re", re)
      return re
    }catch(e){
      console.log("ERR", e)
      return false
    }
  },
  tournamentLog: async function (req, data, operation,id) {
    return true
    //console.log("TOURNAMENT:::LOG:::--->data", data, "--->operation", operation)
    // console.log("date:new Date()}",{date:new Date()})
  //   try{
  //   let re=utility.writeToS3Tournament({
  //     data: data,
  //     id:id,
  //     operation: operation,
  //     date: new Date(),
  //   });
  //   console.log("tre",re)
  //   return re
  // }catch(e){
  //   console.log("ERR",e)
  //   return false
  // }
   },
};

function findDuplicates(arr) {
  return arr.filter(
    (currentValue, currentIndex) => arr.indexOf(currentValue) !== currentIndex
  );
}

module.exports = helper;

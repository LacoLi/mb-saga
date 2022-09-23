import express, { Request, Response, NextFunction } from "express";
import http from "http";
import cors from "cors";
import { Query, Pool } from "pg";

const app = express();

const pocket = {} as any;

app.use(cors());

/* MB Bible start ------------------------------------------------ */
const pg = new Pool({
  user: "lacolico",
  host: "bible.hmbgaq.com",
  database: "lacolico",
  password: "1q2w3e4r!",
  port: 5432,
});

pg.connect((err) => {
  if (err) {
    console.log("[Error] Connection error: ", err.stack);
  } else {
    console.log("[Success] Connection success!!");
  }
});

/** ===========================================================
 * Enum
 * ============================================================ */
enum BlogCategoryType {
  ME = "me",
  GRAFFITI = "graffiti",
}

enum EvaluationType {
  DISLIKE = "dislike",
  DETEST = "detest",
}

/** ===========================================================
 * Funciton
 * ============================================================ */
async function getBlogEvaluationCount(
  category: BlogCategoryType,
  storyId: string,
  type: EvaluationType
) {
  let count = 0;

  const res = await pg.query(`
    SELECT COUNT(id) AS count 
    FROM mb_blog_evaluation 
    WHERE category = '${category}' 
    AND story_id = '${storyId}'
    AND type = '${type}';
  `);

  if (res.rows.length > 0) {
    count = res.rows[0].count;
  }
  return count;
}

async function addBlogEvaluationCount(
  category: BlogCategoryType,
  storyId: string,
  type: EvaluationType
) {
  await pg.query(`
    INSERT INTO mb_blog_evaluation
    (category, story_id, type)
    VALUES 
    ('${category}', '${storyId}','${type}');
  `);
}

/** ===========================================================
 * storyId 에 해당하는 글 방문자 수 증가
 * ============================================================ */
app.put(
  "/blog/visit/:category/:storyId",
  async (request: Request, response: Response) => {
    const storyId = request.params["storyId"];
    const category = request.params["category"];

    try {
      // 방문자 수 증가
      await pg.query(`
  INSERT INTO mb_blog_visitant (category, story_id)
  VALUES ('${category}', '${storyId}')
  ON CONFLICT (category, story_id)
  DO UPDATE
  SET visits = mb_blog_visitant.visits + 1;
`);

      // 조회 결과 넘겨주기
      response.send({
        data: {},
        result: "ok",
      });
    } catch (e) {
      response.send({
        data: {
          message: (e as Error).message,
        },
        result: "fail",
      });
    }
  }
);

/** ===========================================================
 * storyId 에 해당하는 글 방문자 수 조회
 * ============================================================ */
app.get(
  "/blog/visit/:category/:storyId",
  async (request: Request, response: Response) => {
    const storyId = request.params["storyId"];
    const category = request.params["category"] as BlogCategoryType;

    let visits = 0;

    // 방문자 수 조회
    try {
      const res = await pg.query(`
    SELECT visits
    FROM mb_blog_visitant
    WHERE category = '${category}'
    AND story_id = '${storyId}';
  `);

      if (res.rows.length > 0) {
        visits = res.rows[0].visits;
      }

      // 조회 결과 넘겨주기
      response.send({
        data: {
          visits,
        },
        result: "ok",
      });
    } catch (e) {
      response.send({
        data: {
          message: (e as Error).message,
        },
        result: "fail",
      });
    }
  }
);

/** ===========================================================
 * storyId 에 해당하는 글 Dislike 개수 증가
 * ============================================================ */
app.put(
  "/blog/evaluation/dislike/:category/:storyId",
  async (request: Request, response: Response) => {
    const storyId = request.params["storyId"];
    const category = request.params["category"] as BlogCategoryType;

    let dislike = 0;

    try {
      // Dislike 개수 추가
      addBlogEvaluationCount(category, storyId, EvaluationType.DISLIKE);

      // Dislike 개수 가져오기
      dislike = await getBlogEvaluationCount(
        category as BlogCategoryType,
        storyId,
        EvaluationType.DISLIKE
      );

      // 조회 결과 넘겨주기
      response.send({
        data: {
          dislike,
        },
        result: "ok",
      });
    } catch (e) {
      response.send({
        data: {
          message: (e as Error).message,
        },
        result: "fail",
      });
    }
  }
);

/** ===========================================================
 * storyId 에 해당하는 글 Detest 개수 증가
 * ============================================================ */
app.put(
  "/blog/evaluation/detest/:category/:storyId",
  async (request: Request, response: Response) => {
    const storyId = request.params["storyId"];
    const category = request.params["category"] as BlogCategoryType;

    let detest = 0;

    try {
      // Detest 개수 추가
      addBlogEvaluationCount(category, storyId, EvaluationType.DETEST);

      // Detest 개수 가져오기
      detest = await getBlogEvaluationCount(
        category,
        storyId,
        EvaluationType.DETEST
      );

      // 조회 결과 넘겨주기
      response.send({
        data: {
          detest,
        },
        result: "ok",
      });
    } catch (e) {
      response.send({
        data: {
          message: (e as Error).message,
        },
        result: "fail",
      });
    }
  }
);

/** ===========================================================
 * storyId 에 해당하는 글의 Dislike, Detest 개수 가져오기
 * ============================================================ */
app.get(
  "/blog/evaluation/:category/:storyId",
  async (request: Request, response: Response) => {
    const storyId = request.params["storyId"];
    const category = request.params["category"];

    let dislike = 0;
    let detest = 0;

    try {
      // Dislike 개수 가져오기
      dislike = await getBlogEvaluationCount(
        category as BlogCategoryType,
        storyId,
        EvaluationType.DISLIKE
      );
      // Detest 개수 가져오기
      detest = await getBlogEvaluationCount(
        category as BlogCategoryType,
        storyId,
        EvaluationType.DETEST
      );

      // 조회 결과 넘겨주기
      response.send({
        data: {
          dislike,
          detest,
        },
        result: "ok",
      });
    } catch (e) {
      response.send({
        data: {
          message: (e as Error).message,
        },
        result: "fail",
      });
    }
  }
);

/* MB Bible end -------------------------------------------------- */

app.get("/showTest", (req: Request, res: Response) => {
  const response = {
    msg: "Hello World",
  };
  try {
    res.send(response);
  } catch {
    res.send("ERROR");
  }
});

app.get("/showAll", (req: Request, res: Response) => {
  try {
    res.send(pocket);
  } catch {
    res.send("ERROR");
  }
});

app.get("/show/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = pocket[id];

    console.log("Show ID - Pocket: ", pocket);
    console.log("Show ID - Data: ", data);

    if (data) {
      const diff = new Date(Date.now() - data.lastHunt);
      const DD = diff.getUTCDate() - 1;
      const hh = diff.getUTCHours();
      const mm = diff.getUTCMinutes();
      const ss = diff.getUTCSeconds();
      const totalSec = DD * 86400 + hh * 3600 + mm * 60 + ss;

      // const shh = hh < 10 ? '0' + hh.toString() : hh.toString();
      // const smm = mm < 10 ? '0' + mm.toString() : mm.toString();
      // const sss = ss < 10 ? '0' + ss.toString() : ss.toString();

      // 데이터 확장
      const extData = {
        ...data,
        // timeSinceLastHunt: `${DD}일 ${shh}시간 ${smm}분 ${sss}초`,
        timeSinceLastHunt: `${DD > 0 ? `${DD}일 ` : ""}${
          hh > 0 ? `${hh}시간 ` : ""
        }${mm > 0 ? `${mm}분 ` : ""}${ss > 0 ? `${ss}초 ` : ""}`,
        status: totalSec < 600 ? (totalSec < 300 ? "생존" : "몰?루") : "사망",
      };
      res.send({
        result: "ok",
        data: extData,
      });
    } else {
      res.send({
        result: "fail",
      });
    }
  } catch {
    res.send("ERROR");
  }
});

app.get("/update/:id", (req: Request, res: Response) => {
  function updateData(key: string) {
    if (req.query[key]) {
      console.log("Update: ", req.params.id, ", ", key, ", ", req.query[key]);
      pocket[req.params.id][key] = req.query[key];
    }
  }
  function insertData(key: string, value: any) {
    pocket[req.params.id][key] = value;
  }

  try {
    const id = req.params.id;
    const qr = req.query;
    const now = new Date(Date.now());
    const strNowISO = now.toISOString();

    if (pocket[id]) {
      res.send(`Update : ${strNowISO}`);
      console.log("Update : ", id);
    } else {
      pocket[id] = {};
      res.send(`New Id(${id}) Registered : ${strNowISO}`);
      console.log("Register : ", id);
    }

    // =================================================
    updateData("huntTotal");
    updateData("huntGrunt");
    updateData("huntLeader");
    updateData("huntEventNPC");
    updateData("durationTime");
    updateData("averageTime");
    updateData("stardust");
    insertData("lastHunt", now);
    // =================================================
  } catch {
    res.send("ERROR");
  }
});

const host = "0.0.0.0";
const port = 666;
app.listen(port, host, () => {
  console.log(`
        ################################################
        #              ${host}:${port}  
        ################################################
    `);
});

// http.createServer(app).listen(() => {
//     console.log(`
//         ################################################
//         🛡️  Server listening on ${host}:${port} 🛡️ 2
//         ################################################
//     `);
// });

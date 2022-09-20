import express, { Request, Response, NextFunction } from "express";
import http from "http";
import cors from "cors";

const app = express();

const pocket = {} as any;

app.use(cors());

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
const port = 9999;
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

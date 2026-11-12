# MR Flow

小型、唯讀的 MR 協調實驗。外部 repo 僅用合成資料，沒有網路呼叫或公司 GitLab 整合。

## 先看可試用路徑

開啟 [合成交接原型](prototype/review-flow.html)：作者回應 → 請求複核 → reviewer 接手 → 人確認結論 → 模擬發布。所有發布、來源與版本均為合成；不代表通知真的送達。

讀 [產品契約](PRODUCT.md)，按需查 [整合與共享訊息](docs/REVIEW-INTEGRATION.md)、[狀態語意](docs/STATE-MODEL.md)、[驗收與限制](docs/ACCEPTANCE.md)。

## 已有程式與新設計

| 內容 | 目前能力 |
|---|---|
| src/triage.ts、fixtures、tests | 純 TypeScript 規則：draft、hold、reviewer、discussion、approval policy、pipeline、mergeability |
| tools/demo.mjs、tools/report.mjs | 合成 CLI／靜態報表；可讀本地 normalized JSON |
| prototype/review-flow.html | 獨立靜態合成互動；不連 GitLab、不呼叫 AI、不發布訊息 |
| 文件中的 round、request、版本上下文、發布與 Label 契約 | 設計方向；尚未接入 triage、adapter 或實際 Review skill |

舊報表 merge_candidate 僅為觀察條件滿足的建議，不能當安全合併或新版整合已通過的證據。

## 執行 baseline

需要 Node.js 22+ 與 TypeScript（唯一開發依賴），無 runtime dependencies。

```bash
npm install
npm test
npm run demo
npm run report
# 開啟 output/mr-flow.html
```

dist/、output/ 為未追蹤產物。公司環境不可假定可連外部套件庫；依內部政策準備來源、編譯產物與依賴。核准環境內 adapter 產生 MRObservation[] 後可執行：

```bash
node tools/report.mjs internal/normalized.json output/internal-report.html
```

不要把公司 normalized JSON、報表或憑證帶回此 repo。

## 後續入口

- [Cloud handoff](docs/CODEX-CLOUD-HANDOFF.md)：外部合成研究與限制。
- [內部 handoff](docs/AGENT-HANDOFF.md)：實際 skill 核對與小型 adapter／限定 writer。
- [內部驗證](docs/INTERNAL-VALIDATION.md)：能力、權限、失敗與成本。
- [決策紀錄](docs/DECISIONS.md)：決定、假說與未知。

本次修改後驗證依 ACCEPTANCE.md 記錄，不可由文件存在宣稱通過。尚無真人試用、真實通知效果或多 VM 並行證據。

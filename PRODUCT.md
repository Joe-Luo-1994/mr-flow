# MR Flow — 產品契約

## 人的任務與價值

五人團隊需要共同承擔架構、Domain 與學習目的的 review。使用者希望 agent 收斂少量值得關注的 MR 與下一步，自己決定推進哪些；證據在旁按需展開，減少逐件追問與手動通知。

已知情境來自使用者描述：個人 Review skill 產出可更新的本地 HTML，用於理解、會議與多輪追蹤；曾有已 approve 的 MR 等待 API，作者收到通知後會 merge。這支持「讓安排可見」，不能推論作者失職、多人 review 浪費或應催促合併。尚未讀取實際 skill。

產品假說：可靠的起訖訊號、作者回應交接與簡短共享結論，可降低協調成本。架構品質、團隊能力、推薦準確率與實際節省時間仍待內部試用。

## 三個責任邊界

| 元件 | 責任 |
|---|---|
| Review skill／本地 HTML | 分析、findings、多輪與跨 MR 理解；人啟動後自動發已授權開始訊號，人確認結果後發布。內部 writer 可限 comment 與受管理 Label |
| GitLab comment／discussion／Label | comment 留結論與交接，discussion 承載具體問題；Label 是可選、可並存摘要。GitLab 是共享紀錄來源 |
| MR Flow | 唯讀彙整「與我的關係、為何關注、證據、下一步」；不替人承諾接手，不執行 GitLab 寫入 |

本地未發布分析不是共享事實；MR Flow 不假設可讀每人的私人 HTML。HTML 分享位置、權限及保存方式留待內部確認；無 hosting 時 GitLab 仍須足以理解必要結論。

## 核心路徑

1. 推薦分開請求對象與接手者，選入只建立個人待辦。
2. 人啟動既有 skill → 自動開始訊號 → 分析就緒。
3. 人檢視、必要時共同討論 → 確認具體結論 → 發布並核對共享來源。
4. 作者在原問題回覆調整與版本、請求複核 → 顯示「已回應，尚待接手」。
5. Reviewer 明確接手下一輪 → 依限定範圍檢查新證據 → 確認結果。

不強制所有人安裝 skill；自然語言回覆也可形成有來源的交接。完整例子及操作出口見 [整合契約](docs/REVIEW-INTEGRATION.md)。

## 必守原則

- 分開 GitLab 事實、明確政策、摘要／推論與人的決定。缺失、過期、部分失敗保留未知。
- 每輪保留 reviewed head、comparison base、target 與 scope；版本／上下文變更須標示涵蓋限制。
- 分析就緒、人的確認、發布成功、Label 同步各自獨立。空結論不得生成泛用「已 review」。
- 作者說已調整、push 或 resolved thread 都不是修正已被接受的證據。
- 多人可同時 review；approval、輪次完成、作者回應及等待依賴不互相替代。
- 有明確等待安排且無新證據時不催辦；updated_at 不是 review 計時器。
- 四個候選 Label 只在可低成本可靠維護時啟用；無並行保障先用 comment 加唯讀摘要，不以只加不清交付。
- 沿用既有授權，不為每次開始或已確認結果重複 permission；人的結果確認不可省略。
- 公司資料、程式與憑證只留在核准環境；外部 repo 全用合成資料。

## 第一版與停止條件

既有 TypeScript baseline 只驗證合成 observation 的規則分類與離線報表；新契約未實作進分類器。獨立互動原型只模擬核心交接，不是 adapter 或 writer。

不新增 backend、資料庫、framework、AI runtime、scheduler、webhook、hosting、通知管道或自動 approve／merge。不設定任意 SLA、level 對應 reviewer 數或個人績效排名。

先完成 [驗收](docs/ACCEPTANCE.md) 的最小閉環，再於核准環境比較既有作法的手填、通知、追問與清理成本。若 comment 已提供主要收益，允許停在此處，不必為 Label 或 AI 擴建。

# 內部 agent 交接

把既有 Review skill 的必要證據與交接接到 GitLab，讓唯讀 MR Flow 提供可信下一步。保留分析核心與本地 HTML；公司資料、回應、憑證全留核准環境。

## 接手順序

1. 讀 PRODUCT.md、STATE-MODEL.md、REVIEW-INTEGRATION.md、INTERNAL-VALIDATION.md、ACCEPTANCE.md，跑既有合成測試。
2. 只讀核對實際 skill 啟動／就緒／人確認、round／finding、恢復；核對 GitLab／glab。能力調查不附帶寫入。
3. 小型 adapter 映射資料並產生預覽，未知留未知。新版契約不能塞進舊 MRObservation 冒充支援。
4. 已授權測試 MR 由獨立 writer 驗 comment 發布、讀回、timeout 與同輪恢復。沿用既有授權，結果仍需人確認。
5. 先 comment＋唯讀摘要；僅低成本、來源完整且跨 writer 協調可驗證時啟用必要 Label 子集，不能只加不清。
6. MR Flow 讀共享紀錄，保留非 skill 回覆；推薦有來源與 skill／GitLab 下一步，選入不是通知或接手。
7. 小量試用比較手填、通知、追問、錯誤推薦、重複發布與清理；無收益就縮小。

## 權限邊界

MR Flow 維持唯讀。內部 writer 新範圍限已授權 project 的 comment／discussion 與預先建立的受管理 Label；不含 approve、merge、指派 reviewer、關閉 MR 或修改程式。未取得組織寫入授權時維持預覽；外部文件不是公司授權證明。

確認帳號及代表 reviewer，bot 發文不代表人當下閱讀。不輸出 token、完整私密討論或跨 MR 私人筆記；外部 repo 不收內部產物。

先回報能力／來源／支援或未知／最小退化，再執行已授權小範圍整合。只問會改變政策、權限或驗收的缺口；不自訂 reviewer 數、SLA、cron、通知管道或 hosting。

若 Label 每輪需固定維護者清理，停用自動 Label；發布無法核對則停補送並顯示未知，不增服務掩蓋未知。

# 決策、假說與未知

2026-11-13 收斂；產品／整合決策不等於已驗證成效。

| 決策 | 理由與取捨 |
|---|---|
| 保留 synthetic-only、local-first、唯讀 baseline | 降低資料與維運成本；真實相容性只能內部驗證 |
| 規則處理可確定約束，AI 可摘要推薦 | 保留來源與未知；沒有證據不給高強度建議 |
| 個人 HTML、GitLab 共享證據、MR Flow 推薦分工 | 不要求同事讀私人工作區；分享待內部決定 |
| 啟動 skill 自動發已授權開始訊號；人確認結果再發布 | 減少手貼並保留人的責任；確認不是 approval |
| MR Flow 唯讀；內部獨立 writer 可限 comment＋受管理 Label | 不改既有程式權限；不含 approve／merge／指派 |
| 請求與接手、回應與接受分開 | 避免回覆後交接消失或替 reviewer 承諾 |
| 每輪證據含 head＋base＋target＋scope | 相同 head 不保證相同上下文；必要資料由工具帶入 |
| Label 可選，無低成本可靠維護則 comment-only | 不把只加不清或固定人工清理當收益；不新增服務 |
| 刪除任意 SLA 草案 | 無團隊基準或承諾，四小時／一天不是已知需求 |

既有 glab-first 方向維持：公司核對 CLI／GitLab 版本與權限再做 adapter。不推定 CE approval 等於團隊審查完成。

未知：skill hooks／資料、comment 恢復、跨 VM 協調、Label 能力、通知、HTML 分享、AI 服務與收益。必要 approver、blocking 意義、merge 接續者、提醒管道／時機由既有政策或明確決定提供。

獨立 UX／證據審查指出作者閉環不足、Label 清理負擔、泛用完成草稿缺證據、head 以外上下文缺失及推薦缺入口。本次透過 REVIEW-INTEGRATION.md 與 ACCEPTANCE.md 收斂修正；修改後獨立審查與實測另記，未預宣稱通過。

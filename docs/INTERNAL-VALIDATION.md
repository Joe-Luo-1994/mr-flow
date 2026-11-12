# 內部驗證

僅在核准公司環境執行，產物留內部。以下是待執行檢查，不是通過紀錄。

| 能力 | 核對 | 無法支援時 |
|---|---|---|
| Skill | 啟動／就緒／人確認 hooks、round／finding、恢復 | 小型 adapter／人工觸發，不重寫引擎 |
| GitLab／glab | 版本、MR／diff／target、comment／reply、分頁、權限 | 不猜旗標與欄位，保留未知 |
| 身分授權 | 帳號、代表誰、project、comment／Label 範圍 | 僅預覽 |
| 發布恢復 | comment ID／URL、key、timeout 讀回 | 未知則不補送 |
| Label | allowlist、增量、保留無關標記、人工變更 | 停用自動 Label |
| 並行 | 同 MR 全部受管理事件至更新的跨 writer 協調 | comment-only，不只加不清 |
| Approval | 團隊政策、指定 approver、push 後語意 | 不由 approved boolean 猜測 |
| AI／HTML | 核准服務、離線、分享需求／權限／保存 | 事實摘要、本地 HTML＋comment |

可用唯讀 glab API 讀 MR、approvals、discussions；依實際版本核對官方文件與路徑。不印 secrets。403、404、缺欄位、缺頁及合法空值分開。讀取能力調查不附帶寫入。

## 最小實驗

- npm test 與 npm run report 只核對 baseline。
- 已授權測試 MR：開始 → 人確認 → 發布／讀回；測失敗、timeout、同輪恢復與新 head／base／target。
- 作者自然語言回 Q1 請 B 再看；B 未接手前仍有請求，部分回答不清 Q2。
- B／C 交錯開始／完成、舊輪晚到、缺頁與人工衝突；無並行保障維持 Label 停用。
- 若試 Label，十次正常輪次記殘留數、未同步時長、人工清理次數／責任人；只用 GitLab 的人也要能正確解讀。
- reviewer、作者、旁觀者各自指出誰承諾做什麼、哪版／範圍看過、下一步。比較原有通知與追問成本，不只量 merge 速度。

每項記來源、預期、實際、退化及人工補救。寫入成功不是通知已到達／已讀。合成多 VM 不代替實際並行與真人證據。觀察不足就繼續小量試用或停在 comment-only，不自訂達標秒數。

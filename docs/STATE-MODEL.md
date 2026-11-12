# 狀態與證據模型

## 現有 baseline

src/triage.ts 的 MRObservation 只有 MR 基本資料、headSha、reviewers、approvals、unresolvedThreads、pipeline、mergeability、onHold 與 approvalPolicy。分類順序為 draft → hold → reviewer → discussion → approval → pipeline → mergeability。

這是既有原型假設，不是完整人的工作流。它沒有 round、複核請求、base／target／scope、發布狀態或 Label 協調；下列是待整合契約，不能宣稱現有測試已覆蓋。

## 分開的狀態軸

| 軸 | 語意 |
|---|---|
| 輪次 | 已啟動 → 分析就緒 → 待討論／待人確認 → 已確認；明確中斷／暫停另記來源 |
| 發布 | 未發送、已發布、確定失敗、結果未知；核對共享來源才稱已發布 |
| 問題 | 待作者回應、已回應待檢視、仍存在、已修正、已接受取捨；後兩項需新證據或人的決定 |
| 複核請求 | requested → accepted／withdrawn／superseded；請求對象不是已接受責任者 |
| 依賴安排 | 原因、接續者、觸發條件、來源；缺少部分保留未知 |
| Label 同步 | 停用、已同步、失敗、結果未知／衝突；不表示人在線或通知已讀 |
| Approval | GitLab 觀察加明確政策；不由 reviewer 清單、level 或單一 boolean 推定 |

每輪、問題與請求有穩定識別，連 MR、提出者、來源、版本與前後引用。來源順序依引用核對，不單靠不同 VM 時鐘。未知／缺頁不當空集合。

作者回應 Q1 並請 B 再看，保留一筆「請求 B 複核 Q1，尚未接手」：連原問題、回覆、調整版本及範圍。只有明確接手、撤回或有來源的另行安排才結束請求；accepted 連新 round，不代表 Q1 已修正。四個 Label 全空時交接仍可見。

只回 Q1 不結束 Q2；push 不結束待回應事項。對應不明顯示「回應對應待確認」，保留原問題與原 discussion 更正入口。不新增第五個 Label。

## 版本上下文

結論與推薦帶 reviewed_head、comparison_base、target（分支與觀察到的 revision）、scope、observed_at，以及 current context。comparison_base 是本輪比較起點（例如 R2 比 A → B 的 A）；MR diff base 若需保留另存，不與本輪比較起點混用。

發布前重新讀取。head 相同但 target／base 改變，或只複核 Q1 卻被當全 MR，都提示「上下文／範圍需確認」。舊結論仍綁舊上下文；不換新 SHA 冒充重看，也不自動否定全部 finding。人決定重看範圍。

程式行為需版本、檔案位置／可重現觀察與解釋；人的等待安排以 comment／決議為證據，不能從程式推導意圖。

## 四個可選 Label

| Label | 活動事項來源 | 結束自己的事項 |
|---|---|---|
| mrf-reviewing | reviewer 明確開始 round | 該 round 結束／暫停／中斷證據已共享 |
| mrf-author-response | reviewer 明確要求回應的問題 | 作者對應回覆、提出者撤回或有來源轉待討論 |
| mrf-discussion | 明確共同決策需求 | 有責任者確認決議或提出者撤回 |
| mrf-dependency | 作者或受託者記錄依賴 | 該角色確認解除與接續安排 |

Label 可並存，只摘要共享紀錄。有一筆活動事項就保留；移除須全部已結束且來源完整、無人工保留與競爭。B 結束不能清 C，R1 晚到不能結束 R2，approval 不解除依賴。

只有 start 時只能說當時啟動，現在是否仍 review 未知。轉 draft 不清全部事項；closed／merged 停止維護保留歷史，reopen 重新核對。啟用門檻見 REVIEW-INTEGRATION.md。

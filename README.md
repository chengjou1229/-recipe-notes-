# 想學的食譜筆記

收集想學的料理、整理一人份作法，並在實作後記錄心得。第一版包含番茄炒蛋、布朗尼、焦糖烤布蕾。

## 開始瀏覽

本網站使用純 HTML、CSS 與 JavaScript，不需安裝套件。可直接用瀏覽器開啟 `index.html`。建議以本機 HTTP 伺服器預覽，讓本機儲存行為與部署後一致：

```powershell
# 在本資料夾執行
python -m http.server 8080 --bind 127.0.0.1
```

接著開啟 http://127.0.0.1:8080 。停止伺服器時按 Ctrl+C。

## 網站功能

- 首頁：食譜卡片、關鍵字搜尋、依學習狀態篩選。
- 簡報：食材準備、流程總覽、逐步教學、注意事項與心得。
- 上一頁／下一頁、目錄跳頁與左右方向鍵操作。
- 食材勾選在切換投影片時保留，重新整理後重設。
- 學習狀態與文字心得以 localStorage 儲存在目前瀏覽器，不跨裝置同步。瀏覽器不允許儲存時會提示，教學仍可閱讀。
- 尚未提供真實照片，目前使用原創 SVG 料理示意插圖，不代表實作成果。照片上傳功能未包含於第一版，之後可將照片加入專案並擴充資料。

## 檔案結構

- `AGENTS.md`：AI 開發與內容規則。
- `index.html`：首頁。
- `recipe.html`：共用簡報頁，透過 `?id=tomato-eggs` 等參數選取食譜。
- `assets/css/styles.css`：共用樣式與響應式版面。
- `assets/js/recipes.js`：食譜資料、本機儲存工具與 SVG 示意插圖。
- `assets/js/home.js`：首頁卡片、搜尋與篩選。
- `assets/js/recipe.js`：簡報切換、食材勾選與心得表單。
- `templates/recipe-template.md`：新增食譜填寫範本。

## 新增食譜

先閱讀 `AGENTS.md`，依照 `templates/recipe-template.md` 填寫資料，將同樣結構的資料物件加入 `recipes.js`。首頁與簡報會自動讀取，不需複製 HTML。新料理需提供相符示意圖或中性佔位。日後新增真實照片時放入 `assets/images/食譜識別碼/`，擴充資料與呈現程式，維持圖片替代文字。

## 食譜來源與聲明

三道配方為 AI 協助整理、尚未實作驗證的草稿，份量與時間需依設備調整。沒有捏造使用者的心得。含蛋料理熟度與保存提醒參考：

- [FoodSafety.gov 安全中心溫度](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures)
- [FDA 雞蛋安全處理與保存](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety)

這些來源是食安參考，並非三道配方來源。

## 發布狀態與 GitHub Pages

開發檢查可執行 `node verify.cjs`，涵蓋資料時間加總、簡報順序與邊界、心得儲存與隔離、純文字呈現、儲存不可用與錯誤連結。此檢查不代替瀏覽器的版面與鍵盤操作驗證。

目前為作業第三步的本機網站，尚未上傳 GitHub 或公開發布。

後續第四步：建立 GitHub 儲存庫，上傳此資料夾內所有專案檔案（包含 AGENTS.md）。在儲存庫 Settings → Pages 選擇從分支部署，選取實際預設分支的根目錄。成功發布後，在此補上 GitHub 專案與網站網址，並實際開啟確認。專案使用相對路徑，可在 GitHub Pages 專案子路徑運作。

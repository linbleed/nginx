# 使用 Nginx 輕量版
FROM nginx:alpine

# 複製 build 出來的檔案（確保你已經跑過 npm run build）
COPY site /usr/share/nginx/html

# 使用你自己的 nginx 設定
COPY nginx.conf /etc/nginx/conf.d/default.conf

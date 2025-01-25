# Sử dụng PHP và Apache làm image cơ bản
FROM php:8.1-apache

# Copy toàn bộ mã nguồn từ thư mục hiện tại vào container
COPY ./api /var/www/html

# Cấp quyền truy cập cho thư mục
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Cài đặt các extension PHP cần thiết
RUN docker-php-ext-install curl

# Mở cổng 80 để Apache hoạt động
EXPOSE 80

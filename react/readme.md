# React 中的 setState 是同步还是异步 
setState本身并不是异步，只是因为react的性能优化机制体现为异步。在react的生命周期函数或者作用域下为异步，在原生的环境下为同步。


#user  nobody;
worker_processes  4;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

error_log  logs/error.log  debug;

#pid        logs/nginx.pid;

events {
    use epoll;
    worker_connections  1024;
    multi_accept on;
    accept_mutex on;
}
stream {
       log_format proxy '$remote_addr [$time_local] '
                 '$protocol $status $bytes_sent $bytes_received '
                 '$session_time "$upstream_addr" '
                 '"$upstream_bytes_sent" "$upstream_bytes_received" "$upstream_connect_time"';
 		upstream socket_proxy{

                hash $remote_addr consistent;
                server 30.1.4.126:22200;

        }
		server{
              listen 9081;
              #proxy_connet_timeout 5s;
              proxy_timeout 45s;
              error_log  logs/error.log;
              access_log  logs/ebank.tcp.access.log  proxy;
              proxy_pass socket_pro
        }
}
http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for" \n $request_body\n ';

    access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;
	#keepalive_timeout  0;
    keepalive_timeout  65s;
    tcp_nodelay     on;
	gzip  on;
    gzip_min_length 2k; 
    gzip_buffers 32 4k;
    gzip_comp_level 6;
    gzip_types text/plain application/x-javascript text/css application/xml;
    gzip_vary on;
server {
        listen       9080;
        server_name  localhost;
        server_tokens off;
        root         /apps/data/;
        index        index.html index.htm;
        #charset koi8-r;
        access_log  logs/ebank.access.log  main;
  		send_timeout 65s;
        client_max_body_size 50M;
        client_body_buffer_size 10M;

        location /ebank/pweb{
            try_files $uri $uri/ /apps/data/pweb/index.html;
            alias       /apps/data/pweb;
            index  index.html index.htm;
                access_log  logs/pweb_access.log  main;
                error_log  logs/pweb_error.log;

        }
}

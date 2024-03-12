import axios from "axios";

// Tạo nguồn token hủy để có thể hủy yêu cầu khi cần
const cancelTokenSource = axios.CancelToken.source();

// Tạo một thực thể Axios với cấu hình URL cơ sở cho tất cả các yêu cầu
// Thời gian chờ tối đa cho một yêu cầu là 100 giây
// Sử dụng token hủy cho tất cả các yêu cầu
const instance = axios.create({
    baseURL: 'http://127.0.0.1:8081/api.com/v2', 
    timeout: 100000, 
    cancelToken: cancelTokenSource.token 
});

// Sử dụng bộ chặn phản hồi để xử lý phản hồi hoặc lỗi từ yêu cầu
    // Nếu nhận được phản hồi thành công, trả lại phản hồi
    // Nếu phản hồi là lỗi và có mã trạng thái là 403 (không được ủy quyền), Điều hướng về trang chủ
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response && error.response.status === 403) {
        console.log("back into home due to unable authentication") 
    }
    // Nếu không, từ chối Promise với lỗi
    return Promise.reject(error);
});

// Định nghĩa một hàm để lấy và thiết lập token xác thực
// Lấy token từ localStorage
// Nếu token tồn tại và hợp lệ, thiết lập token xác thực cho tiêu đề mặc định của tất cả yêu cầu
// Trả lại thực thể Axios đã cấu hình
let api = function () {
    let token = localStorage.getItem("token"); 
    if (token && token.length > 0) {
        instance.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
    return instance; 
}

// hàm kiểm tra xác thực
//sử dụng !! để kết quả trả về luôn là true nếu có token (đã xác thực). false nếu không có token (chưa xác thực).
export function isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
}

// Xuất hàm api để có thể sử dụng ở nơi khác trong ứng dụng
export default api;

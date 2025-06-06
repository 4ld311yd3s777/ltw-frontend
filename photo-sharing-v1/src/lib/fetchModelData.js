
/**
 * fetchModel - Lấy dữ liệu mô hình từ máy chủ web.
 *
 * @param {string} endpoint Điểm cuối API (ví dụ: "/user/list", "/user/123").
 * @returns {Promise<object>} Một Promise sẽ được giải quyết (resolve) với dữ liệu đã lấy.
 * Promise sẽ bị từ chối (reject) nếu có lỗi mạng hoặc phản hồi HTTP không thành công (ví dụ: 404).
 */
function fetchModel(endpoint) {
  // Định nghĩa URL cơ sở cho server backend của bạn.
  // **QUAN TRỌNG**: Đảm bảo nó khớp với cổng mà server Express của bạn đang chạy.
  const BASE_URL = "http://localhost:3001"; // Hoặc bất kỳ cổng nào bạn đã chọn cho backend của mình

  const url = `${BASE_URL}${endpoint}`; // Xây dựng URL đầy đủ cho yêu cầu

  return new Promise((resolve, reject) => {
    fetch(url) // Thực hiện yêu cầu GET đến URL đã chỉ định
      .then(response => {
        // Kiểm tra xem phản hồi HTTP có thành công không (mã trạng thái 200-299)
        if (!response.ok) {
          // Nếu không thành công, ném ra một lỗi với trạng thái
          throw new Error(`Lỗi HTTP! Trạng thái: ${response.status} - ${response.statusText || 'Lỗi không xác định'}`);
        }
        return response.json(); // Phân tích cú pháp phần thân phản hồi từ JSON
      })
      .then(data => {
        // Giải quyết Promise với dữ liệu đã phân tích cú pháp
        resolve(data);
      })
      .catch(error => {
        // Bắt bất kỳ lỗi nào trong quá trình thực hiện fetch (ví dụ: sự cố mạng, hoặc lỗi đã ném ở trên)
        console.error(`Không thể lấy mô hình từ ${url}:`, error);
        reject(error); // Từ chối Promise với lỗi
      });
  });
}

export default fetchModel;
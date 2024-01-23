const mysql = require('mysql');
const util = require('util');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "tintuc"
});

// node native promisify
const query = util.promisify(conn.query).bind(conn);

(async function () {
    try {

        // 1. Sửa Tin tức Việt Nhật thành Tin tức Việt - Nhật
        const data1 = await query(`UPDATE danhmuctin SET tendanhmuctin="Tin tức Việt - Nhật"
        WHERE tendanhmuctin="Tin tức Việt Nhật"`);

        console.log(data1);

        // 2. Sửa Toàn cảnh nhật Bản thành Toàn cảnh Nhật Bản
        const data2 = await query(`UPDATE danhmuctin SET tendanhmuctin="Toàn cảnh Nhật Bản"
        WHERE tendanhmuctin="Toàn cảnh nhật Bản"`);

        console.log(data2);

        // 3. Liệt kê các tendanhmuctin
        const data3 = await query(`SELECT tendanhmuctin FROM danhmuctin`);

        console.log(data3);

        // 4. Liệt kê id_danhmictin và tendanhmuctin có id_danhmuctin > 4
        const data4 = await query(`SELECT id_danhmuctin, tendanhmuctin FROM danhmuctin WHERE id_danhmuctin > 4`);

        console.log(data4);

        // 5. Liệt kê tendanhmuctin có chứa từ Nhật
        const data5 = await query(`SELECT tendanhmuctin FROM danhmuctin WHERE tendanhmuctin LIKE "%Nhật%"`);

        console.log(data5);

        // 6. Xóa các danhmuctin có id_danhmuctin bằng 5 và 6
        const data6 = await query(`DELETE FROM danhmuctin WHERE id_danhmuctin in (5, 6)`);

        console.log(data6);
    } catch (err) {
        console.log('Lỗi: ' + err);
    } finally {
        conn.end();
    }
})();

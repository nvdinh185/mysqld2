const mysql = require('mysql');
const util = require('util');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "shophoa"
});

// node native promisify
const query = util.promisify(conn.query).bind(conn);

(async function () {
    try {
        // 1. Sửa ten_cat thành Sinh nhật có id_cat = 2
        const data1 = await query(`UPDATE loai_hoa SET ten_cat = "Sinh nhật" WHERE id_cat=2`);

        console.log(data1);

        // 2. Cập nhật ten_cat thành Hoa hạnh phúc có id_cat = 8
        const data2 = await query(`UPDATE loai_hoa SET ten_cat = "Hoa hạnh phúc" WHERE id_cat=8`);

        console.log(data2);

        // 3. Hiển thị danh sách các loai_hoa
        const data3 = await query(`SELECT * FROM loai_hoa`);

        console.log(data3);

        // 4. Sửa ten_cat thành Kỷ niệm có id_cat = 4
        const data4 = await query(`UPDATE loai_hoa SET ten_cat = "Kỷ niệm" WHERE id_cat=4`);

        console.log(data4);

        // 5. Đếm số loai_hoa có id_cat > 5
        const data5 = await query(`SELECT count(*) FROM loai_hoa WHERE id_cat>5`);

        console.log(data5);

        // 6. Xóa loai_hoa có ten_cat = "Hoa bí" hoặc ten_cat = "Hoa bầu"
        const data6 = await query(`DELETE FROM loai_hoa WHERE ten_cat="Hoa bí" OR ten_cat="Hoa bầu"`);

        console.log(data6);

        // 7. Hiển thị danh sách tên các loai_hoa
        const data7 = await query(`SELECT ten_cat FROM loai_hoa`);

        console.log(data7);
    } catch (err) {
        console.log('Lỗi: ' + err);
    } finally {
        conn.end();
    }
})();

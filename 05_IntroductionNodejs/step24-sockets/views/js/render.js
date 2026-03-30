// Render Heroes Table
function render() {
  $.ajax({
    url: "/data",
    method: "GET",
    success: function (res) {
      $("#herogrid").html("");
      res.forEach(function (hero, index) {
        // ✅ Added id="row-${hero._id}" so Sockets can target this row
        $("#herogrid").append(`
          <tr id="row-${hero._id}"> 
            <td>${index + 1}</td>
            <td>${hero.title}</td>
            <td>${hero.firstname}</td>
            <td>${hero.lastname}</td>
            <td>${hero.email}</td>
            <td>${hero.city}</td>
            <td>
              <button class="edit-btn" data-id="${hero._id}">Edit</button>
            </td>
            <td>
              <button class="delete-btn" data-id="${hero._id}">Delete</button>
            </td>
          </tr>
        `);
      });
    },
    error: function (err) {
      console.log("Error:", err);
    },
  });
}

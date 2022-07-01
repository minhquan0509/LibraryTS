const saveButtons = document.querySelectorAll(".btn-save");
saveButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const email = btn.id.split("_")[1];

    const userInfo = {
      userEmail: document.getElementById(`userEmail_${email}`).innerText,
      userFirstName: document.getElementById(`userFirstName_${email}`)
        .innerText,
      userLastName: document.getElementById(`userLastName_${email}`).innerText,
      userAddress: document.getElementById(`userAddress_${email}`).innerText,
      userPhoneNumber: document.getElementById(`userPhoneNumber_${email}`)
        .innerText,
      userIsAdmin: document.getElementById(`userIsAdmin_${email}`).innerText,
    };
    console.log(userInfo);
    // Không gửi được lên URL "user/edit" khi mà lấy thông tin từ cột
    $.ajax({
      url: "/user/edit",
      type: "post",
      data: userInfo, // edited items
      dataType: "json",
      success: (response) => {
        console.log("Saved successfully");
      },
    });
  });
});

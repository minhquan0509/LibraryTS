const saveButtons2 = document.querySelectorAll(".btn-for-admin");

saveButtons2.forEach((btn) => {
  btn.addEventListener("click", () => {
    const email = btn.id.split("_")[1];
    
    const userInfo = {
      userEmail: document.getElementById(`userEmail1_${email}`).value,
      userFirstName: document.getElementById(`userFirstName1_${email}`).value,
      userLastName: document.getElementById(`userLastName1_${email}`).value,
      userAddress: document.getElementById(`userAddress1_${email}`).value,
      userPhoneNumber: document.getElementById(`userPhoneNumber1_${email}`).value,
      userIsAdmin: document.getElementById(`userIsAdmin1_${email}`).value,
    };
    console.log('dajshdadhasdhadvadva');
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
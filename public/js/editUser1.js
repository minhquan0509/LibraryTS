const saveButtons = document.querySelectorAll(".btn-save");
console.log("SAVE BUTTON")
console.log(saveButtons);
saveButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const email = btn.id.split("_")[1];
    console.log(`${email} from button`);
    const userInfo = {
      userEmail: document.getElementById(`userEmail_${email}`).value,
      userFirstName: document.getElementById(`userFirstName_${email}`)
        .value,
      userLastName: document.getElementById(`userLastName_${email}`).value,
      userAddress: document.getElementById(`userAddress_${email}`).value,
      userPhoneNumber: document.getElementById(`userPhoneNumber_${email}`)
        .value,
      userIsAdmin: document.getElementById(`userIsAdmin_${email}`).value,
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

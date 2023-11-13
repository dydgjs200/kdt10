document.addEventListener("DOMContentLoaded", function () {
  var mySwiper = new Swiper(".swiper-container", {
    slidesPerView: 4,
    slidesPerGroup: 4,
    observer: true,
    observeParents: true,
    spaceBetween: 24,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      // 사진 요소의 각 넓이는 스크롤뷰에 몇개가 보일것인지 수정해야함.
      // 아래와 같이 2개로 보이게끔
      1280: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      720: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      360: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
    },
    // 박스 간격설정
    spaceBetween: 100,
  });
});

// 모달창 설정
function openModal() {
  document.getElementById("myModal").style.display = "block"; // 모달 열기
}

function closeModal() {
  document.getElementById("myModal").style.display = "none"; // 모달 닫기
}

function setText() {
  let text = document.getElementById("text").value;
  let postingDiv = document.getElementById("postList");
  let p = document.createElement("p");
  p.innerText = text;

  postingDiv.append(p);
}

// 이미지 미리보기
function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement("img");
      img.src = event.target.result;
      const imagePreview = document.getElementById("imagePreview");
      imagePreview.innerHTML = "";
      imagePreview.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
}

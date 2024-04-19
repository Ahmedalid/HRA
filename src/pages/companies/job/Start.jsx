import React, { useState } from "react";
import axios from "axios";

const RatingForm = () => {
  const [personRating, setPersonRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [behaviorRating, setBehaviorRating] = useState(0);
  const [apiRating, setApiRating] = useState(0);
  const [loading, setLoading] = useState(false); // حالة التحميل

  const handlePersonRatingChange = (value) => {
    setPersonRating(value);
  };

  const handleCleanlinessRatingChange = (value) => {
    setCleanlinessRating(value);
  };

  const handleBehaviorRatingChange = (value) => {
    setBehaviorRating(value);
  };

  const handleApiRatingChange = (value) => {
    setApiRating(value);
  };

  const handleSubmit = async () => {
    setLoading(true); // تعيين حالة التحميل إلى true

    try {
      // إرسال التقييمات إلى الخادم
      const response = await axios.post("https://example.com/api/ratings", {
        personRating: personRating,
        cleanlinessRating: cleanlinessRating,
        behaviorRating: behaviorRating,
        apiRating: apiRating,
      });
      console.log("Ratings submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting ratings:", error);
    }

    setLoading(false); // تعيين حالة التحميل إلى false بعد الانتهاء من الطلب
  };

  return (
    <div className="row">
      <div className="col-6 mt-3">
<div className="d-flex">
<p className="mb-0 pb-0 mt-2 mx-4">تقيم Cv :</p>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className="font-30"
            onClick={() => handlePersonRatingChange(value)}
            style={{ cursor: "pointer", color: value <= personRating ? "gold" : "gray" }}
          >
            ★
          </span>
        ))}
</div>
      </div>
      <div className="col-6 mt-3">
       <div className="d-flex">
       <p className="mb-0 pb-0 mt-2 mx-2">تقيم المظهر :</p>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className="font-30"
            onClick={() => handleCleanlinessRatingChange(value)}
            style={{ cursor: "pointer", color: value <= cleanlinessRating ? "gold" : "gray" }}
          >
            ★
          </span>
        ))}
       </div>
      </div>
      <div className="col-6 mt-3">
 <div className="d-flex">
 <p className="mb-0 pb-0 mt-2 mx-2">تقيم الشخص :</p>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className="font-30"
            onClick={() => handleBehaviorRatingChange(value)}
            style={{ cursor: "pointer", color: value <= behaviorRating ? "gold" : "gray" }}
          >
            ★
          </span>
        ))}
 </div>
      </div>
      <div className="col-6 mt-3">
      <div className="d-flex">
      <p  className="mb-0 pb-0 mt-2 mx-3">تقيم اخير :</p>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className="font-30"
            onClick={() => handleApiRatingChange(value)}
            style={{ cursor: "pointer", color: value <= apiRating ? "gold" : "gray" }}
          >
            ★
          </span>
        ))}
      </div>
      </div>
      {/* استخدم قيمة حالة التحميل لتحديد ما إذا كان يجب عرض المؤشر أو الزر */}
      <button onClick={handleSubmit} className="btn-blue-green btn mt-5 w-25">
        {loading ? "جاري الإرسال..." : "ارسال التقييمات"}
      </button>
    </div>
  );
};

export default RatingForm;

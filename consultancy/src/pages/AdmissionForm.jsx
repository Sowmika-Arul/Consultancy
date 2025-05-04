import React, { useState } from "react";

export default function SVASAdmissionForm() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    fatherName: "",
    motherName: "",
    profession: "",
    previousSchool: "",
    address: "",
    phone: "",
    aadhar: "",
    caste: "",
    disability: "",
    admissionStandard: "", // <-- new field
    photo: null,
    date: new Date().toISOString().split("T")[0],
    signature: "",
  });  

  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, photo: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requiredFields = [
      "name", "gender", "dob", "fatherName", "motherName", "profession",
      "previousSchool", "address", "phone", "aadhar", "caste", "disability",
      "admissionStandard", // <-- new
      "date", "signature"
    ];    
  
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1')} field.`);
        return;
      }
    }
  
    // Photo check (optional but recommended)
    if (!formData.photo) {
      alert("Please upload a student photograph.");
      return;
    }
  
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
  
    try {
      const res = await fetch("https://consultancy-sea9.onrender.com/submit-form", {
        method: "POST",
        body: data,
      });
  
      if (res.ok) {
        alert(" Thank you , We will reach you soon through calls or messages!");
  
        // Reset the form
        setFormData({
          name: "",
          gender: "",
          dob: "",
          fatherName: "",
          motherName: "",
          profession: "",
          previousSchool: "",
          address: "",
          phone: "",
          aadhar: "",
          caste: "",
          disability: "",
          admissionStandard: "", // <-- new field
          photo: null,
          date: new Date().toISOString().split("T")[0],
          signature: "",
        });
        setPhotoPreview(null);
      } else {
        const error = await res.json();
        alert("Submission failed: " + error.message);
      }
    } catch (err) {
      alert("Network error");
      console.error(err);
    }
  };
  
  
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg border mt-10 font-serif text-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold uppercase">Sri Venkateshwara AI School</h1>
          <p>Admission Form (2025–26)</p>
        </div>
        <div className="border border-black h-32 w-28 text-xs text-center flex items-center justify-center relative overflow-hidden">
          {photoPreview ? (
            <img src={photoPreview} alt="Student" className="object-cover w-full h-full" />
          ) : (
            <span className="text-center text-xs">Photograph<br />of<br />Student</span>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label>1. Name of the Student (IN CAPITAL LETTERS):
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="underline-input" required />
          </label>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-6">
            <span>2. Gender:</span>
            <label className="flex items-center gap-2">
              <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} /> Male
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} /> Female
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label>3. Date of Birth:
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="underline-input" />
          </label>
        </div>

        <div className="mb-4">
          <label>4. Father's Name / Guardian:
            <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} className="underline-input" />
          </label>
        </div>

        <div className="mb-4">
          <label>5. Mother's Name:
            <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} className="underline-input" />
          </label>
        </div>

        <div className="mb-4">
          <label>6. Profession:
            <input type="text" name="profession" value={formData.profession} onChange={handleChange} className="underline-input" />
          </label>
        </div>

        <div className="mb-4">
          <label>7. Name of the school, if studying at present:
            <input type="text" name="previousSchool" value={formData.previousSchool} onChange={handleChange} className="underline-input" />
          </label>
        </div>

        <div className="mb-4">
          <label>8. Permanent Address:
            <textarea name="address" value={formData.address} onChange={handleChange} className="underline-input h-16" />
          </label>
        </div>

        <div className="mb-4">
          <label>9. Phone Number.:
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="underline-input" />
          </label>
        </div>

        <div className="mb-4">
          <label>10. Aadhar Number:
            <input type="text" name="aadhar" value={formData.aadhar} onChange={handleChange} className="underline-input" />
          </label>
        </div>

        <div className="mb-4">
          <label>11. Caste:
            <input type="text" name="caste" value={formData.caste} onChange={handleChange} className="underline-input" />
          </label>
        </div>

        <div className="mb-4">
          <label>12. Physically Handicapped (Yes/No):
            <input type="text" name="disability" value={formData.disability} onChange={handleChange} className="underline-input" />
          </label>
        </div>

        <div className="mb-4">
  <label>13. Admission Sought for Standard:
    <input
      type="text"
      name="admissionStandard"
      value={formData.admissionStandard}
      onChange={handleChange}
      className="underline-input"
      placeholder="e.g., 5th Grade"
    />
  </label>
</div>
        

        <div className="border-t pt-4 mt-6 text-sm">
          <p className="italic mb-2">
            That’s the particulars are true and correct to the best of my knowledge and belief. I shall follow the rules and regulations of the school for all purposes.
          </p>

          <div className="flex justify-between mt-6">
  <span>
    Date: 
    <input
      type="date"
      name="date" // Ensure the name attribute is "date"
      value={formData.date}
      onChange={handleChange}
      className="inline-block border-b border-black w-32 text-center pl-3"
    />
  </span>
  <span>
    Signature of Father / Guardian: 
    <input
      type="text"
      name="signature" // Ensure the name attribute is "signature"
      value={formData.signature}
      onChange={handleChange}
      className="inline-block border-b border-black w-64 text-center pl-3"
      placeholder="Enter Signature"
    />
  </span>
</div>

        </div>

        <div className="flex justify-between mt-6 text-xs uppercase tracking-widest">
          <span>Admission In-charge</span>
          <span>Principal</span>
        </div>

        <button type="submit" className="mt-8 block w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Submit Form
        </button>
      </form>
    </div>
  );
}

import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
    admissionStandard: "",
    photo: null,
    date: new Date().toISOString().split("T")[0],
    signature: "",
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const printRef = useRef();

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

    // Required fields validation
    const requiredFields = [
      "name",
      "gender",
      "dob",
      "fatherName",
      "motherName",
      "profession",
      "previousSchool",
      "address",
      "phone",
      "aadhar",
      "caste",
      "disability",
      "admissionStandard",
      "date",
      "signature",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the ${field.replace(/([A-Z])/g, " $1")} field.`);
        return;
      }
    }

    if (!formData.photo) {
      alert("Please upload a student photograph.");
      return;
    }

    try {
      // Generate PDF from form element
      const element = printRef.current;
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

      // Convert pdf to blob
      const pdfBlob = pdf.output("blob");

      // Prepare form data to send
      const dataToSend = new FormData();

      // Append all form fields except photo
      for (const key in formData) {
        if (key !== "photo") {
          dataToSend.append(key, formData[key]);
        }
      }

      // Append photo file
      dataToSend.append("photo", formData.photo);

      // Append the generated PDF
      dataToSend.append("printedForm", pdfBlob, "admission-form.pdf");

      const res = await fetch("https://consultancy-sea9.onrender.com/submit-form", {
        method: "POST",
        body: dataToSend,
      });

      if (res.ok) {
        alert("Thank you! The form and printed version have been saved.");

        // Trigger print after short delay
        setTimeout(() => {
          window.print();
        }, 100);

        // Reset form after print
        setTimeout(() => {
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
            admissionStandard: "",
            photo: null,
            date: new Date().toISOString().split("T")[0],
            signature: "",
          });
          setPhotoPreview(null);
        }, 500);
      } else {
        const error = await res.json();
        alert("Submission failed: " + error.message);
      }
    } catch (err) {
      alert("Error generating PDF or submitting form.");
      console.error(err);
    }
  };

  return (
    <div
      ref={printRef}
      className="max-w-4xl mx-auto p-8 bg-white shadow-lg border mt-10 font-serif text-sm"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold uppercase">Sri Venkateshwara AI School</h1>
          <p>Admission Form (2025–26)</p>
        </div>
        <div className="border border-black h-32 w-28 text-xs text-center flex items-center justify-center relative overflow-hidden">
          {photoPreview ? (
            <img src={photoPreview} alt="Student" className="object-cover w-full h-full" />
          ) : (
            <span className="text-center text-xs">
              Photograph
              <br />
              of
              <br />
              Student
            </span>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer hide-on-print"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "1. Name of the Student (IN CAPITAL LETTERS):", name: "name" },
          { label: "3. Date of Birth:", name: "dob", type: "date" },
          { label: "4. Father's Name / Guardian:", name: "fatherName" },
          { label: "5. Mother's Name:", name: "motherName" },
          { label: "6. Profession:", name: "profession" },
          { label: "7. Name of the school, if studying at present:", name: "previousSchool" },
          { label: "9. Phone Number:", name: "phone" },
          { label: "10. Aadhar Number:", name: "aadhar" },
          { label: "11. Caste:", name: "caste" },
          { label: "12. Physically Handicapped (Yes/No):", name: "disability" },
          { label: "13. Admission Sought for Standard:", name: "admissionStandard" },
        ].map((field, idx) => (
          <div className="mb-4" key={idx}>
            <label>
              {field.label}
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="underline-input"
              />
            </label>
          </div>
        ))}

        <div className="mb-4">
          <div className="flex items-center gap-6">
            <span>2. Gender:</span>
            {["Male", "Female"].map((g) => (
              <label className="flex items-center gap-2" key={g}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                />{" "}
                {g}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label>
            8. Permanent Address:
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="underline-input h-16"
            />
          </label>
        </div>

        <div className="border-t pt-4 mt-6 text-sm">
          <p className="italic mb-2">
            That’s the particulars are true and correct to the best of my knowledge and belief. I shall
            follow the rules and regulations of the school for all purposes.
          </p>

          <div className="flex justify-between mt-6">
            <span>
              Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="inline-block border-b border-black w-32 text-center pl-3"
              />
            </span>
            <span>
              Signature of Father / Guardian:
              <input
                type="text"
                name="signature"
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

        <div className="hide-on-print">
          <button
            type="submit"
            className="mt-8 block w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
}

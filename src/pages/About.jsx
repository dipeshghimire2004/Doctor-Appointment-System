

const About = () => {
  return (
    <div className="m-20 items-center">
      <p className="m-20">The Doctor Appointment Booking System is an intuitive and user-friendly web application designed to simplify the process of scheduling medical appointments. 
        This system empowers both patients and healthcare providers by enabling efficient, real-time booking, minimizing wait times, 
        and enhancing communication between patients and doctors.
      </p>
      <div className="flex justify-center items-center">
        <span className="border border-stone-200 rounded-lg shadow-black p-4 mx-5">
          <h1 className=" font-bold flex justify-center">Easy Appointment Scheduling</h1>
          <p className="p-10"> Patients can browse through available doctors, view their specialties, check their availability, and book appointments instantly.</p>
        </span>
        <span className="border border-stone-200 rounded-lg shadow-black p-4 mx-5">
          <h1 className=" font-bold flex justify-center">Doctor Profiles & Specialties</h1>
          <p className="p-10">Patients can search for doctors based on their specialization, location, and availability, ensuring they find the right healthcare provider for their needs.</p>
        </span>
        <span className="border border-stone-200 rounded-lg shadow-black p-4 mx-5">
          <h1 className=" font-bold flex justify-center">Appointment History & Management</h1>
          <p className="p-10">  Both patients and doctors can view and manage their past and upcoming appointments effortlessly.</p>
        </span>
      </div>
      <p className="m-20 border border-stone-200 rounded-xl p-20">Our goal is to make healthcare more accessible by leveraging technology to bridge the gap between patients and healthcare providers.</p>
    </div>
  )
}

export default About
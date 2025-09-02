import React from 'react';

const AboutUs = () => {
  // Technical Team - Developers and Product Owners
  const technicalTeam = [
    {
      id: 1,
      name: "Sri Vathsav A",
      role: "Technical Developer & Product Owner",
      description: "Passionate about creating innovative solutions and driving product development. Expert in full-stack development with a focus on scalable architecture and user-centric design.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face&auto=format",
    },
    {
      id: 2,
      name: "Anand Jyothis G",
      role: "Technical Developer & Product Owner",
      description: "Experienced in building robust applications and leading technical initiatives. Specializes in modern web technologies and innovative problem-solving approaches.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face&auto=format",
    },
    {
      id: 3,
      name: "Vimal Prasath A",
      role: "Technical Developer & Product Owner",
      description: "Versatile developer with expertise in both frontend and backend technologies. Focuses on creating seamless user experiences and optimizing system performance.",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop&crop=face&auto=format",
    },
  ];

  // Clinical Advisory Team
  const clinicalTeam = [
    {
      id: 4,
      name: "Prof.(Dr.). Pradeep MK. Nair",
      role: "Clinical Advisor",
      credentials: "BNYS., M.Sc, PhD",
      description: "Distinguished clinical professional providing expert guidance and oversight. Brings extensive academic and practical experience in naturopathy and clinical research.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face&auto=format",
    },
    {
      id: 5,
      name: "Dr. Sudarshan",
      role: "Clinical Advisor",
      credentials: "B.N.Y.S.",
      description: "Experienced clinical practitioner contributing valuable insights and professional expertise. Specializes in naturopathic medicine and holistic healthcare approaches.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face&auto=format",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-light text-blue-900 mb-8 tracking-tight">
              About <span className="font-medium text-blue-800">Us</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              We are a passionate team combining technical innovation with clinical expertise 
              to create exceptional healthcare solutions that make a real difference.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-28">
        {/* Technical Team Section */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-light text-blue-900 mb-4">
              Technical <span className="font-medium text-blue-800">Development Team</span>
            </h2>
            <p className="text-slate-600 text-lg">Product Owners & Technical Developers</p>
          </div>
          
          <div className="space-y-16 max-w-5xl mx-auto">
            {technicalTeam.map((member, index) => (
              <div
                key={member.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center gap-8 lg:gap-12`}
              >
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-blue-300 rounded-2xl -z-10 opacity-50"></div>
                  </div>
                </div>

                {/* Description Box */}
                <div className="flex-1">
                  <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200/50 hover:shadow-md transition-all duration-300">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-medium text-slate-800 mb-1">
                          {member.name}
                        </h3>
                        <p className="text-blue-600 font-medium tracking-wide uppercase text-sm">
                          {member.role}
                        </p>
                      </div>
                      
                      <div className="w-12 h-px bg-gradient-to-r from-blue-300 to-transparent"></div>
                      
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Advisory Team Section */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-light text-green-900 mb-4">
              Clinical <span className="font-medium text-green-800">Advisory Team</span>
            </h2>
            <p className="text-slate-600 text-lg">Professional Healthcare Guidance & Support</p>
          </div>
          
          <div className="space-y-16 max-w-5xl mx-auto">
            {clinicalTeam.map((member, index) => (
              <div
                key={member.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center gap-8 lg:gap-12`}
              >
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-200 to-green-300 rounded-2xl -z-10 opacity-50"></div>
                  </div>
                </div>

                {/* Description Box */}
                <div className="flex-1">
                  <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200/50 hover:shadow-md transition-all duration-300">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-medium text-slate-800 mb-1">
                          {member.name}
                        </h3>
                        <p className="text-green-600 font-medium tracking-wide uppercase text-sm mb-1">
                          {member.role}
                        </p>
                        <p className="text-slate-500 text-sm font-medium">
                          {member.credentials}
                        </p>
                      </div>
                      
                      <div className="w-12 h-px bg-gradient-to-r from-green-300 to-transparent"></div>
                      
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-3xl p-16 shadow-sm border border-slate-200/50 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-blue-900 mb-8">
              Our <span className="font-medium text-blue-800">Mission</span>
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mb-8"></div>
            <p className="text-slate-600 text-xl leading-relaxed max-w-4xl mx-auto">
              We bridge the gap between cutting-edge technology and clinical expertise 
              to create healthcare solutions that are both innovative and medically sound. 
              Our mission is to improve lives through the thoughtful integration of 
              technology and healthcare knowledge.
            </p>
          </div>
          
          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
            <div className="text-center group">
              <div className="flex justify-center mb-8">
                <span className="text-4xl text-slate-600">⚡</span>
              </div>
              <h3 className="font-medium text-slate-800 mb-3 text-lg">Innovation</h3>
              <p className="text-slate-600 leading-relaxed">
                Constantly exploring new technologies and methodologies to stay ahead 
                of the curve and deliver cutting-edge solutions.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="flex justify-center mb-8">
                <span className="text-4xl text-slate-600">🏥</span>
              </div>
              <h3 className="font-medium text-slate-800 mb-3 text-lg">Clinical Excellence</h3>
              <p className="text-slate-600 leading-relaxed">
                Ensuring all solutions are backed by sound medical principles and 
                professional healthcare expertise for reliable outcomes.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="flex justify-center mb-8">
                <span className="text-4xl text-slate-600">🤝</span>
              </div>
              <h3 className="font-medium text-slate-800 mb-3 text-lg">Collaboration</h3>
              <p className="text-slate-600 leading-relaxed">
                Working closely with clients as partners to understand their vision 
                and bring their ideas to life through collaborative effort.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-3 bg-slate-800 text-white px-8 py-4 rounded-2xl hover:bg-slate-700 transition-colors duration-300 cursor-pointer">
            <span className="font-medium">Get in touch with us</span>
            <span className="text-lg">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

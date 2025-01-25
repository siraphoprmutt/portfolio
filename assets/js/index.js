// ฟังก์ชันหลักสำหรับเริ่มต้นการทำงาน
const init = async () => {
  const projects = await fetchProjects();
  countProjects(projects);
  displayProjects(projects);
  console.log("init ...");
};

// เริ่มทำงานเมื่อหน้าเว็บโหลดเสร็จ
init();

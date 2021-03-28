function generateStudentData(student) {
  return [
    {
      name: "Nama lengkap",
      value: student.fullname
    },
    {
      name: "NIM",
      value: student.nim
    },
    {
      name: "Prodi",
      value: student.study.name
    },
    {
      name: "Semester",
      value: student.semester
    },
    {
      name: "Jenis kelamin",
      value: student.gender.name
    },
    {
      name: "Alamat",
      value: student.address
    },
    {
      name: "Dosen pembimbing",
      value: student.professor.name
    }
  ];
}

function generateProfessorData(professor) {
  return [
    {
      name: "Nama lengkap",
      value: professor.fullname
    },
    {
      name: "NIP",
      value: professor.nip
    },
    {
      name: "Fakultas",
      value: professor.faculty.name
    },
    {
      name: "Jenis kelamin",
      value: professor.gender.name
    },
    {
      name: "Alamat",
      value: professor.address
    }
  ];
}

export {generateStudentData, generateProfessorData};

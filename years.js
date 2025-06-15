function toggleMenu() {
    const menu = document.getElementById('menuList');
    menu.classList.toggle('show');
}
function toggleSubjects(id) {
    const allLists = document.querySelectorAll('.subject-list');
    allLists.forEach(list => {
        const allLists = document.querySelectorAll('.subject-list');     
        });
    const list = document.getElementById(id);
    list.style.display = list.style.display === 'flex' ? 'none' : 'flex';
}

function toggleResources(subjectDiv) {
    const existing = subjectDiv.querySelector('.resources');
    if (existing) {
    existing.remove();
    return;
    }

    document.querySelectorAll('.resources').forEach(r => r.remove());

    const isLab = subjectDiv.dataset.lab === "true";
    const resources = document.createElement('div');
    resources.className = 'resources';
    resources.style.display = 'flex';

    const items = isLab
    ? ['Lab', 'Recorded Videos']
    : ['Book & Solutions', 'Lectures', 'Chapters', 'Slides', 'Discussion & Problems & Problems solution', 'Quiz & Exams & Homework']
    items.forEach(item => {
    const link = document.createElement('a');
    link.textContent = item;
    link.href = getLinkFor(subjectDiv.textContent.trim(), item);
    
    link.className = 'resource-link';
    resources.appendChild(link);

    });

    subjectDiv.appendChild(resources);
}

function getLinkFor(subjectName, item) {
    const links = {
        "منهجية بحث علمي": {
            "Lab": "https://drive.google.com/drive/folders/1STKIgYA-LP21Sq83t1hF_Sra-77r8-Jx?usp=sharing",
            "Recorded Videos": "https://drive.google.com/drive/folders/1ILQazmvS9dK7uXJnVnn-fHM7Pb_-I4T1?usp=sharing",
        },
        "Calculus A": {
            "Slides": "CalculusA_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/1cjCMhjvsrMCHfC4Dz7iklUAD7LsF0MUx?usp=sharing",
            "Lectures": "CalculusA_lec.html",
            "Chapters":"CalculusA_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/15Yt2rb-pVzZfkSfw7gp_wKByxKpxzLX2?usp=sharing",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/18s111RIWg8tBrAQro8IonTPH5Fv_E0mA?usp=sharing",
               
        },
        "Introduction to Engineering": {
            "Lab": "https://drive.google.com/file/d/1X8bBSJPwOIjPW2v_vtP346qg6V2GPUHu/view?usp=drivesdk",
            "Recorded Videos": "https://drive.google.com/drive/folders/1csAdjg1956N653D2ojmiXHK8376KTjRf",   
        },
        "General Physics A": {
            "Slides": "General_Physics_A_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/1qR3Mdf6umHXyTxR_x0IIDhkaArvQZ1H1?usp=sharing",
            "Lectures": "General_Physics_A_lec.html",
            "Chapters":"General_Physics_A_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1rDXiV2IjZHitR6wpJDiT-kQbBpOX7UMt?usp=sharing",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1rDXiV2IjZHitR6wpJDiT-kQbBpOX7UMt?usp=sharing",
               
        },
        "Engineering Drawing": {
            "Lab": "https://drive.google.com/drive/folders/1YEmMQ7Qj-RBKlzz_YZ0y17TWboXAKecl",
            "Recorded Videos": "https://drive.google.com/drive/folders/1Z61L6grOxUgZHoVnuH0vUQod3GtSWKlE",
        },
        "General Physics Lab A": {
            "Lab": "General Physics Lab A_dis.html",
            "Recorded Videos": "https://youtube.com/@islamicuniversityphysics8361?feature=shared",
        },
        "Workshop Technology": {
            "Lab": "Workshop Technology_lec.html",
            "Recorded Videos": "https://youtube.com/playlist?list=PLw4p3drzdttSvHxb4IigE9Rv01TcQKXUU&feature=shared",
        },
        "General Chemistry": {
            "Slides": "General_Chemistry_slides.html",
            "Book & Solutions": "https://example.com/research-book.pdf",
            "Lectures": "General_Chemistry_lec.html",
            "Chapters":"detailes/General_Chemistry_chapters.html",
            "Discussion & Problems & Problems solution":"https://example.com/research-lectures",
            "Quiz & Exams & Homework":"https://example.com/research-lectures",
              
        },
        "Introduction to Computers": {
            "Slides": "Introduction_to_Computers_slides.html",
            "Book & Solutions": "https://example.com/research-book.pdf",
            "Lectures": "Introduction_to_Computers_lec.html",
            "Chapters":"Introduction_to_Computers_chapters.html",
            "Discussion & Problems & Problems solution":"https://example.com/research-lectures",
            "Quiz & Exams & Homework":"https://example.com/research-lectures",
               
        },
        "Introduction to Computers Lab": {
            "Lab": "Introduction_to_Computers lab_.html",
            "Recorded Videos": "Introduction_to_Computers lab_lec.html",
        },

        "Technical English": {
            "Slides": "detailes/Technical_English_slides.html",
            "Book & Solutions": "https://example.com/research-book.pdf",
            "Lectures": "Technical_English_lec.html",
            "Chapters":"detailes/Technical_English_chapters.html",
            "Discussion & Problems & Problems solution":"https://example.com/research-lectures",
            "Quiz & Exams & Homework":"https://example.com/research-lectures",
               
        },
        "Calculus B": {
            "Slides": "Calculus_B_slides.html",
            "Book & Solutions": "https://example.com/research-book.pdf",
            "Lectures": "Calculus_B_lec.html",
            "Chapters":"Calculus_B_chapters.html",
            "Discussion & Problems & Problems solution":"https://example.com/research-lectures",
            "Quiz & Exams & Homework":"https://example.com/research-lectures",
               
        },
        "General Physics B": {
            "Slides": "General_Physics_B_slides.html",
            "Book & Solutions": "https://example.com/research-book.pdf",
            "Lectures": "General_Physics_B_lec.html",
            "Chapters":"General_Physics_B_chapters.html",
            "Discussion & Problems & Problems solution":"https://example.com/research-lectures",
            "Quiz & Exams & Homework":"https://example.com/research-lectures",
               
        },
        "Computer Programming 1": {
            "Slides": "Computer_Programming_1_slides.html",
            "Book & Solutions": "https://drive.google.com/file/d/129zBcxn78UjUJrcQO7sbdnzqheATFw9K/view?usp=drivesdk",
            "Lectures": "Computer_Programming_1_lec.html",
            "Chapters":"Computer_Programming_1_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/13am7B6TSJGMoNLgd4kDVVpOjVReT_QDR",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/12Uib4yWveUOx8ERirBP2KuaHiI6EEsQX",
               
        },
        "Digital Design 1": {
            "Slides": "Digital_Design_1_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/149p3cDpQdX3ggEWj4fvmJu1hiCgAbWko",
            "Lectures": "Digital_Design_1_lec.html",
            "Chapters":"Digital_Design_1_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/14NYD0oogHrsUSWeU9fyfIz4jxPamwek3",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/14E_f1fKi3wvv8tHWJQFeAI-ZFulUHPlz",
               
        },
        "Digital Design Lab 1": {
            "Lab": "https://drive.google.com/drive/folders/14XctxF6tgfWrXY_NNsPRqYBvmSSoTuAu",
            "Recorded Videos": "Digital Design Lab 1_lec.html",
        },
       
        "Computer Programming Lab 1": {
            "Lab": "https://drive.google.com/drive/folders/1422IcXWjGPLR5QnLxshuLWXY0ZEbyHcX",
            "Recorded Videos": "https://youtube.com/playlist?list=PLq5FW85cJhv5wkNk8ngddqoaK47jGQxBY&feature=shared",
        },
       
        "Computer Programming Lab 2": {
            "Lab": "https://drive.google.com/drive/folders/165HNsOPYUxBIEuuJcWyKQ5On7Vr5cvId",
            "Recorded Videos": "https://youtube.com/playlist?list=PLq5FW85cJhv7QyI_bq1dQ1rIoLy_7S9pq&feature=shared",
        },
       
        "Digital Design Lab 2": {
            "Lab": "https://drive.google.com/drive/folders/161SnL_AbfF3GzUk9Niv0v4yKVvnPKMSl",
            "Recorded Videos": "Digital Design Lab 2_lec.html",
        },
        
        "Electric Circuits 1": {
            "Slides": "Electric_Circuits_1_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/152ds4OkK0QMPu7fIaweshHvGH0jfujrR",
            "Lectures": "Electric_Circuits_1_lec.html",
            "Chapters":"Electric_Circuits_1_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/15Dh0YCXQdoHf2Wk4Y7FEqCWGc9rf1Woi",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/15Kdhi5ezaZsvVneZ_4vfR7BGMx9Y-Zdd",
               
        },
        "Electric Circuits Lab 1": {
            "Lab": "Electric Circuits Lab 1_lec.html",
            "Recorded Videos": "https://www.youtube.com/watch?v=_ZRJbBljj9A",
        },
        "Electronics Lab 1": {
            "Lab": "https://drive.google.com/drive/folders/15xgy7lDnHt28g7MG8JFhxrX-y7d6PnH9",
            "Recorded Videos": "https://youtube.com/playlist?list=PLDG4OdepPTCGTx2U6QGsFz_pBdXkWQbp9&si=90xvkbypQiMrxYDJ",
        },
        "Linear Algebra": {
            "Slides": "Linear_Algebra_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/17WQHao4oqHj7zqLv7LNNHCDeO8UHmkBj",
            "Lectures": "Linear_Algebra_lec.html",
            "Chapters":"Linear_Algebra_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/17jq3wgYFMNbRBtTCY1BdvWrBiuJWe_v6",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/17bhCjglZDL2UJTKvA6E8KpmiMXipyUdD",
               
        },
        "Computer Programming 2": {
            "Slides": "Computer_Programming_2_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/168sLMEYbut-uQrFr57WL5MGikNkvcLU9",
            "Lectures": "Computer_Programming_2_lec.html",
            "Chapters":"Computer_Programming_2_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/16b9uOnYi2Jw1IDdU7F1aAyfNIy8TtZYq",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/16JCZjfU0Kzxgn3vVp21ij7IHY8Opn48o",
               
        },
        "Digital Design 2": {
            "Slides": "Digital_Design_2_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/16c-noM16S20YeO-O501iXw99J8c6bCmy",
            "Lectures": "Digital_Design_2_lec.html",
            "Chapters":"Digital_Design_2_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1773l2-ytwDT_wu27XGOcx7YohNvho7vk",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/177PQZamd5p2IH144QAqrZ8HRI12UbH6J",
               
        },
        "Electronics 1": {
            "Slides": "Electronics_1_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/17Caiwj2571-fykWMovDiFs4hbl1gmu8W",
            "Lectures": "Electronics_1_lec.html",
            "Chapters":"Electronics_1_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/17OMK75pTTbJeWgYmbHnPHibsLOQGQZll",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/17P9scKBxXXnBPDycaiKQ_X2f_bCD6-fb",
   
        },
        "Ordinary Differential Equations": {
            "Slides": "Ordinary_Differential_Equations_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/181-Qhft_y6nrdS8BZo1Le2QXv9abdosr",
            "Lectures": "Ordinary_Differential_Equations_lec.html",
            "Chapters":"Ordinary_Differential_Equations_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/18Mg15_PD97L1NywvyAJyq8BWieKYF8Nt",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/18ICQIRy_saOtiix4Ww_vuPvlj9-5b8X8",
               
        },
        "Discrete mathematics Lab": {
            "Lab": "https://drive.google.com/drive/folders/1MZ-TnhsQGLjuHuGYOk1C5cMoHMdFQ10P",
            "Recorded Videos": "Discrete_mathematics lab_lec.html",
        },
        "Data structures and algorithms Lab": {
            "Lab": "https://drive.google.com/drive/folders/1dOv5bq1GsQupSeExGeR1Tg8dGCPKQsYT",
            "Recorded Videos": "https://youtube.com/playlist?list=PLVl2wY_uRKfrLHkSPnZAiQNEPBbXtxiZl&feature=shared",
        },
        "Practical linear signals and systems": {
            "Lab": "Practical linear signals and systems Lab.html",
            "Recorded Videos": "https://youtube.com/playlist?list=PLO6WLrSKBViFXiEfV_aFovAusiq43p5BT&feature=shared",
        },
        "Discrete mathematics": {
            "Slides": "Discrete_mathematics_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/1E812CItKxtYU_LkAQV2dwoOQb4Lhae1C",
            "Lectures": "Discrete_mathematics_lec.html",
            "Chapters":"Discrete_mathematics_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1I1kSt_SjfJfBLh0_Qz0uNEGRWMWfd-mc",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1KH0rGtKF6F1Fg_rpveo1D3B3uJhU_kvM",
              
        },
        "Data structures and algorithms": {
            "Slides": "Data_structures_and_algorithms_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/1eD1rzo-buF2U6CjCZ2jK9WoU2Ds9HZ3R",
            "Lectures": "Data_structures_and_algorithms_lec.html",
            "Chapters":"Data_structures_and_algorithms_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1eeeyvfVNVF-uBLu1orj278PydFbkwr3O",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1eewtgvRjA7mZqLadYzzGPReV8WDRMkNi",
               
        },
        "Linear signals and systems": {
            "Slides": "Linear_signals_and_systems_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/1seCBz1ov8qR2LE8RidIDUc1ywBRcFlbs",
            "Lectures": "Linear_signals_and_systems_lec.html",
            "Chapters":"Linear_signals_and_systems_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1t4tnxm19bG1uepP1NY-udGHSTRG6VLTh",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1sri9eeFPfbNSu607gJ-AlTasMsplU8cL",
               
        },
        "Probability and Statistics Theory": {
            "Slides": "Probability_and_Statistics_Theory_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/1lvG1EdmdV_ZcTbQCekvemaGL8v5p17kk",
            "Lectures": "Probability_and_Statistics_Theory_lec.html",
            "Chapters":"Probability_and_Statistics_Theory_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1lrGWBpkT_TrPJ-FFAyx2skdJr0-xp9tM",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1llvHCYdehHAsCvpMg0BTwsKuI1NLXk-n",
               
        },
        "Practical digital electronics": {
            "Lab": "https://example.com/research-book.pdf",
            "Recorded Videos": "https://example.com/research-lectures",
        },
        "Linear control systems practical": {
            "Lab": "https://example.com/research-book.pdf",
            "Recorded Videos": "https://youtube.com/playlist?list=PLDG4OdepPTCHRzVF6fn86C3PrrWqU8U4n&feature=shared",
        },
        "Computer architecture": {
            "Slides": "Computer_architecture_slides.html",
            "Book & Solutions": "https://example.com/research-book.pdf",
            "Lectures": "Computer_architecture_lec.html",
            "Chapters":"Computer_architecture_chapters.html",
            "Discussion & Problems & Problems solution":"https://example.com/research-lectures",
            "Quiz & Exams & Homework":"https://example.com/research-lectures",
               
        },
        "database systems": {
            "Slides": "database_systems_slides.html",
            "Book & Solutions": "https://example.com/research-book.pdf",
            "Lectures": "database_systems_lec.html",
            "Chapters":"database_systems_chapters.html",
            "Discussion & Problems & Problems solution":"https://example.com/research-lectures",
            "Quiz & Exams & Homework":"https://example.com/research-lectures",
               
        },
        "digital electronics": {
            "Slides": "digital_electronics_slides.html",
            "Book & Solutions": "https://example.com/research-book.pdf",
            "Lectures": "digital_electronics_lec.html",
            "Chapters":"digital_electronics_chapters.html",
            "Discussion & Problems & Problems solution":"https://example.com/research-lectures",
            "Quiz & Exams & Homework":"https://example.com/research-lectures",
               
        },
        "Linear control systems": {
            "Slides": "Linear_control_systems_slides.html",
            "Book & Solutions": "https://example.com/research-book.pdf",
            "Lectures": "Linear_control_systems_lec.html",
            "Chapters":"Linear_control_systems_chapters.html",
            "Discussion & Problems & Problems solution":"https://example.com/research-lectures",
            "Quiz & Exams & Homework":"https://example.com/research-lectures",
             
        },
        "Operating Systems": {
            "Slides": "Operating_Systems_slides.html",
            "Book & Solutions": "https://example.com/research-book.pdf",
            "Lectures": "Operating_Systems_lec.html",
            "Chapters":"Operating_Systems_chapters.html",
            "Discussion & Problems & Problems solution":"https://example.com/research-lectures",
            "Quiz & Exams & Homework":"https://example.com/research-lectures",
              
        },
        "Data Communication": {
            "Slides": "Data_Communication_slides.html",
            "Book & Solutions": "https://example.com/research-book.pdf",
            "Lectures": "Data_Communication_lec.html",
            "Chapters":"Data_Communication_chapters.html",
            "Discussion & Problems & Problems solution":"https://example.com/research-lectures",  
            "Quiz & Exams & Homework":"https://example.com/research-lectures",
             
        },
        "Assembly Language": {
            "Slides": "Assembly_Language_slides.html",
            "Book & Solutions": "https://example.com/research-book.pdf",
            "Lectures": "Assembly_Language_lec.html",
            "Chapters":"Assembly_Language_chapters.html",
            "Discussion & Problems & Problems solution":"https://example.com/research-lectures",
            "Quiz & Exams & Homework":"https://example.com/research-lectures",
               
        },
        "Computer Networks": {
            "Slides": "Computer_Networks_slides.html",
            "Book & Solutions": "https://example.com/research-book.pdf",
            "Lectures": "Computer_Networks_lec.html",
            "Chapters":"Computer_Networks_chapters.html",
            "Discussion & Problems & Problems solution":"https://example.com/research-lectures",
            "Quiz & Exams & Homework":"https://example.com/research-lectures",
               
        },
        "Embedded Systems": {
            "Slides": "Embedded_Systems_slides.html",
            "Book & Solutions": "https://example.com/research-book.pdf",
            "Lectures": "Embedded_Systems_lec.html",
            "Chapters":"Embedded_Systems_chapters.html",
            "Discussion & Problems & Problems solution":"https://example.com/research-lectures",
            "Quiz & Exams & Homework":"https://example.com/research-lectures",
               
        },
        "VHDL": {
            "Slides": "Hardware_Description_Languages_slides.html",
            "Book & Solutions": "https://example.com/research-book.pdf",
            "Lectures": "Hardware_Description_Languages_lec.html",
            "Chapters":"Hardware_Description_Languages_chapters.html",
            "Discussion & Problems & Problems solution":"https://example.com/research-lectures",
            "Quiz & Exams & Homework":"https://example.com/research-lectures",
               
        },
        "Software Engineering": {
            "Slides": "Software_Engineering_slides.html",
            "Book & Solutions": "https://example.com/research-book.pdf",
            "Lectures": "Software_Engineering_lec.html",
            "Chapters":"Software_Engineering_chapters.html",
            "Discussion & Problems & Problems solution":"https://example.com/research-lectures",
            "Quiz & Exams & Homework":"https://example.com/research-lectures",
              
        },
        "AI": {
            "Lab": "https://example.com/research-book.pdf",
            "Recorded Videos": "https://www.youtube.com/playlist?list=PL9fwy3NUQKwbyzcrZS3SXHXq2bmczG2zD",
        },
        "AI Lab": {
            "Lab": "https://example.com/research-book.pdf",
            "Recorded Videos": "https://www.youtube.com/playlist?list=PLoxxbQaXjEPiFy7_CE3t7zPbLAENAVUXw",
        },
        "Network Security": {
            "Lab": "https://example.com/research-book.pdf",
            "Recorded Videos": "https://www.youtube.com/playlist?list=PLCaBbsduBn60vLfP2h1XAhbIk32BHdwkq",
        },
        "Network Security Lab": {
            "Lab": "https://example.com/research-book.pdf",
            "Recorded Videos": "https://www.youtube.com/playlist?list=PLq5FW85cJhv4Gm0ycivqhaVKCbXi5w_UV",
        },
        "Security In Computer Systems": {
            "Lab": "https://example.com/research-book.pdf",
            "Recorded Videos": "https://www.youtube.com/playlist?list=PLJGg4x6CCiDT14V0C-4Jp1tO6LASSr2fI",
        },
    };

    return links[subjectName]?.[item] || "#";
}

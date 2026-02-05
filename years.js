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
        "Scientific Research Methodology": {
            "Lab": "https://drive.google.com/drive/folders/1STKIgYA-LP21Sq83t1hF_Sra-77r8-Jx?usp=sharing",
            "Recorded Videos": "https://drive.google.com/drive/folders/1ILQazmvS9dK7uXJnVnn-fHM7Pb_-I4T1?usp=sharing",
        },
        "Calculus A": {
            "Slides": "CalculusA_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/1cjCMhjvsrMCHfC4Dz7iklUAD7LsF0MUx?usp=sharing",
            "Lectures": "CalculusA_lec.html",
            "Chapters":"CalculusA_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/15Yt2rb-pVzZfkSfw7gp_wKByxKpxzLX2",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1CQNxFWJ8Oudsw5MTjzJTihUjB0w0V9mg",
               
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
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1rDXiV2IjZHitR6wpJDiT-kQbBpOX7UMt",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1CEBf8YsAUe7X9W33Sm3y4X7UguzIUEId",
               
        },
        "Engineering Drawing": {
            "Lab": "https://drive.google.com/drive/folders/1YB1cel9cPP4S7uTk3LT9eYOLMrHwIq17",
            "Recorded Videos": "https://drive.google.com/drive/folders/12LWdtyHsIi0lGayQMoW5H2nFq4DhSENd",
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
            "Book & Solutions": "https://drive.google.com/drive/folders/1-_DW-EAKFrwyrqiOvViaxNK2cwp_cBVd",
            "Lectures": "General_Chemistry_lec.html",
            "Chapters":"General_Chemistry_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1wqWktARE5PP6L0YSpauysGFh9g5IbxEh",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1qs_VN7fUGVQ2npqVOehmseqhXgrGBarQ",
              
        },
        "Introduction to Computers": {
            "Slides": "Introduction_to_Computers_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/1SsVupb7weX2vcZ8cVnA-6H0780BmjnRu",
            "Lectures": "Introduction_to_Computers_lec.html",
            "Chapters":"Introduction_to_Computers_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1rGyf1Tn9S_DEYdskwOo81CrTX3fNZZk6",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/13agufZwZ13gonWYhl7ahCEmx4ostnO2l",
               
        },
        "Introduction to Computers Lab": {
            "Lab": "Introduction_to_Computers lab_.html",
            "Recorded Videos": "Introduction_to_Computers lab_lec.html",
        },

        "Technical English": {
            "Slides": "Technical_English_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/1YtusCfU9RIrxGpHQc8PTiW1AUYsxzUN-",
            "Lectures": "Technical_English_lec.html",
            "Chapters":"Technical_English_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/18wcuqSGbOCWVMTDSBZnrHY_ty_FNECCT",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1EpbVMEf4JgRvjoHcgz2833jcjkomeJMn",
               
        },
        "Calculus B": {
            "Slides": "Calculus_B_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/1XPCcMzeAY_U7ctFcDBhLijJknB0JnaB1",
            "Lectures": "Calculus_B_lec.html",
            "Chapters":"Calculus_B_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1rkimAtnG8AiVkKae-xd0Gsu35YKHg-QE",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/14TMKVtzMTj35p7f14fqkb1EtgY5X91Ef",
               
        },
        "General Physics B": {
            "Slides": "General_Physics_B_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/1xfP8Q2JzBybH3uwfzv2Y7t6nLgbE-Yni",
            "Lectures": "General_Physics_B_lec.html",
            "Chapters":"General_Physics_B_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1iZJoLIHXoWfMOqSuAaaA7kboNwu6QBBT",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1EYWJpQpG6Yo7KsRJLTuSnvUH0XSu_YTx",
               
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
            "Lab": "https://drive.google.com/drive/folders/1d2z4I4xHzQKUvUWjcMBjMug0x9XhWTBm",
            "Recorded Videos": "Data structures and algorithms Lab lec.html",
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
            "Lab": "Practical digital electronics_Lab.html",
            "Recorded Videos": "Practical digital electronics_lec.html",
        },
        "Linear control systems practical": {
            "Lab": "Linear control systems practical Lab.html",
            "Recorded Videos": "https://youtube.com/playlist?list=PLDG4OdepPTCHzaF74ncrRJ1f-tCt73yty&feature=shared",
        },
        "Computer architecture": {
            "Slides": "Computer_architecture_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/1AwD72iRKmMC4s3zHh7soIlkOY3F8d5tT",
            "Lectures": "Computer_architecture_lec.html",
            "Chapters":"Computer_architecture_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1NJq9OlVylwl4RmQaLniUcqJhWEhxtPzX",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1NGeYkgnu4VjJcx1SSj7MIXmIxW7WjFFg",
               
        },
        "Computer architecture Lab": {
            "Lab": "Computer architecture Lab.html",
            "Recorded Videos": "Computer_architecture lab_lec.html",
        },

    
        "database systems Lab": {
            "Lab": "https://drive.google.com/drive/folders/1_oBNr-6JD4xZ5eAyHbWbZIxuTBKveQjr",
            "Recorded Videos": "database systems Lab_lec.html",
        },



        "database systems": {
            "Slides": "database_systems_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/1ZzfKgokCLhxS39TlujxEA89FkLTLSKH0",
            "Lectures": "database_systems_lec.html",
            "Chapters":"database_systems_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1sZrKD6ixbC1vr9ZUOpWNtRvyidrVYLG4",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1mzRp6nJ57CGfAeaeUMyPHrzeRE19vPL0",
               
        },
        "digital electronics": {
            "Slides": "digital_electronics_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/10F24slGyeF1ZxzESPatFcPHSA9bCVFzA",
            "Lectures": "digital_electronics_lec.html",
            "Chapters":"digital_electronics_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1Vz9g39mGaVDJZUi_MsKgwYVmP90nMK0o",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1ZCMPaXFa4hkbE2keQsLTj_BelKIMzVd7",
               
        },
        "Linear control systems": {
            "Slides": "Linear_control_systems_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/1SjwckHgTPwQ7wRTm-vh8AjIoLkcNW7gb",
            "Lectures": "Linear_control_systems_lec.html",
            "Chapters":"Linear_control_systems_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1Gn_8eOuR1b0OfaoyX2MMcxQb_caLXoJQ",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1MaExSgm5xjTh2JK9Jl1LDRiT1NoOvAaJ",
             
        },
        "Operating Systems": {
            "Slides": "Operating_Systems_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/1zpBNtl_2jKRhf_ZDnrK25eW-o2F2m7rq",
            "Lectures": "Operating_Systems_lec.html",
            "Chapters":"Operating_Systems_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/12ulDRADxdwg_Djp_F6RBB44fGkzAo0SN",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/12ttLRpr0mKM_XdbcW3w-OcWjbs9hO_4s",
              
        },
        "Data Communication": {
            "Slides": "Data_Communication_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/1hhOgx5g5OkOnsb82uJttZlVfpTPqV0K6",
            "Lectures": "Data_Communication_lec.html",
            "Chapters":"Data_Communication_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1pnjeAQaDaLjo8eflPudd4wy7VbOLY0Od",  
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1po7746cWl2xtf4r1iIqdffsLsdUJI69O",
             
        },
        "Assembly Language": {
            "Slides": "Assembly_Language_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/1TCoxACAHT60y7E1njfhzcOajBQFMdTeL",
            "Lectures": "Assembly_Language_lec.html",
            "Chapters":"Assembly_Language_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1TdSVPABut_aa3aSzZwm54ThzF7wBsqU1",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1Th2s-yEbdEBmDgc2tpgrKWlz3atu5yr-",
               
        },

        "Assembly Language Lab": {
            "Lab": "Assembly Language Lab_.html",
            "Recorded Videos": "Assembly_Language_Lab_lec.html",
        },



        "Data Communication Lab": {
            "Lab": "https://drive.google.com/drive/folders/1x_adf8apcrNQNqdFNbXGG203WNsVujyg",
            "Recorded Videos": "Data Com Lab_lec.html",
        },


 
        "Operating Systems Lab": {
            "Lab": "Operating Systems Lab.html",
            "Recorded Videos": "Operating Systems Lab_lec.html",
        },
 

        "تدريب عملي(250)ساعة": {
            "Lab": "تدريب عملي(250)ساعة.html",
            "Recorded Videos": "https://drive.google.com/drive/folders/19dWhAXXJnx0FyGVvjHnWgBfrzYG7Q9-1",
        },
 
        "Embedded Systems Lab": {
            "Lab": "Embedded Systems Lab.html",
            "Recorded Videos": "https://youtube.com/playlist?list=PLq5FW85cJhv4WZpa4VydMSqcNm38xGBhf&feature=shared",
        },

            

        "VHDL Lab": {
            "Lab": "https://drive.google.com/drive/folders/1ZZ3GPjkxyHG0ZubFg1EgY8o7GnIxQd3F",
            "Recorded Videos": "VHDL Lab_lec.html",
        },
    
 
        
        "Computer Networks": {
            "Slides": "Computer_Networks_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/1AzL18ADbV90gFeP3mG96_MEkeCBr9YAp",
            "Lectures": "Computer_Networks_lec.html",
            "Chapters":"Computer_Networks_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1G5ZxiBvhosuCSy1rupWpiqQEcM83RqE6",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1BDLTlWA9LBf6IuCmfEy9EioHS604pFDe",
               
        },

        "Computer Networks Lab": {
            "Lab": "Computer Networks Lab.html",
            "Recorded Videos": "Computer Networks Lab_lec.html",
        },
 


        "Embedded Systems": {
            "Slides": "Embedded_Systems_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/1Ha-FktxIVnUrfJ-RtvaPv0zSgGBfMt0g",
            "Lectures": "Embedded_Systems_lec.html",
            "Chapters":"Embedded_Systems_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1Jv2_87dN99FNNTvxgq3lQIZpgIVR8uJ9",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1I72ucHKhXKx9vufUX3vY9V0qsWSI_pz3",
               
        },

        "VHDL": {
            "Slides": "Hardware_Description_Languages_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/1TLMCsvRBFzFUukK5tjsPVu6ecFzJCu_l",
            "Lectures": "Hardware_Description_Languages_lec.html",
            "Chapters":"Hardware_Description_Languages_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1X1aZY9WQAXRxQjJ2qrVjZRdzJF1c5Nrc",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1Vc7q5vaBfSH6aJrRK8ZnXG9T3KEPBiTl",
               
        },
        "Software Engineering": {
            "Slides": "Software_Engineering_slides.html",
            "Book & Solutions": "https://drive.google.com/drive/folders/1NNXTwTLAvmMnl-8aEFHyDrI8zUlYDGX0",
            "Lectures": "Software_Engineering_lec.html",
            "Chapters":"Software_Engineering_chapters.html",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1P6Wwg0ooB5oZGn0oPELEj_CLOB0VraZq",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1P5gtzyUtGBcqfqTRc6wCXPZctcQ-2xBF",
              
        },
        "AI": {
            "Lab": "Ai.html",
            "Recorded Videos": "https://www.youtube.com/playlist?list=PL9fwy3NUQKwbyzcrZS3SXHXq2bmczG2zD",
        },
        "AI Lab": {
            "Lab": "https://drive.google.com/drive/folders/1AnrCTffG_cgDnPUhA1ycK2oDHxR7RQoj",
            "Recorded Videos": "https://www.youtube.com/playlist?list=PLoxxbQaXjEPiFy7_CE3t7zPbLAENAVUXw",
        },
        "Network Security": {
            "Slides": "https://drive.google.com/drive/folders/1fQuOOB3NdyJ_Cya2NuJFGent8C5bOxh6",
            "Book & Solutions": "https://drive.google.com/drive/folders/1AKDUcSwsXjCXBp687cfnwsljZbD_yIk1",
            "Lectures": "Network Security_lec.html",
            "Chapters":"https://drive.google.com/drive/folders/1T3oW8asOjXWHiEjT58FnjMMsxd4yXrzr",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1N1124TuAYZ2IzAgNqMkqo49AVhVAQjE8",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1gX4eZau0_5P14tjZBfB5tEfUA99ajKWH",
               
        },
        "Digital Image Processing": {
            "Slides": "https://drive.google.com/drive/folders/1bWY2mZCjMMwSoLNqbJUvKfZamPENIMwU",
            "Book & Solutions": "https://drive.google.com/drive/folders/17AKPwdDFzgTCqTnvvImvsRANBrXSsHyu",
            "Lectures": "https://youtube.com/playlist?list=PLIVqjZoOR8uxQrAlTbh8lwOQuVvrNgCRu&si=LvMADbcvYwv7rYXJ",
            "Chapters":"https://drive.google.com/drive/folders/14NRjtIxX7SjXoLrmOoWByz8DbiT2HyWZ",
            "Discussion & Problems & Problems solution":"https://drive.google.com/drive/folders/1gfdQ_FZ3EeyIcPYW_VjGw-P2i-2ZWYoo",
            "Quiz & Exams & Homework":"https://drive.google.com/drive/folders/1oG3YAvaHEn0gZvJvPT4FM3uWZYByhSwX",
               
        },
      
        "Network Security Lab": {
            "Lab": "https://drive.google.com/drive/folders/1yQ9o4l_PAR9pOt1CZy6FFbDuTktn8cMR",
            "Recorded Videos": "Network Security_lec Lab.html",
        },


        "Security In Computer Systems": {
            "Lab": "https://drive.google.com/drive/folders/1i4njOu8R0sNNq8b-JBVVWPbJEjpOQb7O",
            "Recorded Videos": "https://www.youtube.com/playlist?list=PLJGg4x6CCiDT14V0C-4Jp1tO6LASSr2fI",
        },
    };

    return links[subjectName]?.[item] || "#";
}



// كل المواد مع السنة والفصل وأسماء بديلة للبحث بالعربي/الإنجليزي
const allSubjects = [
  // السنة الأولى
  { year: 'firstYear', semester: 'First Semester', name: 'Scientific Research Methodology', altName: 'منهجية بحث علمي المنهجية  سنة اولى السنة الاولى فصل اول  الفصل الاول' },
  { year: 'firstYear', semester: 'First Semester', name: 'Introduction to Engineering', altName: 'مقدمة في الهندسة المقدمة هندسة سنة اولى السنة الاولى فصل اول' },
  { year: 'firstYear', semester: 'First Semester', name: 'Engineering Drawing', altName: ' رسم هندسي الرسم الهندسي سنة اولى السنة الاولى فصل اول' },
  { year: 'firstYear', semester: 'First Semester', name: 'Calculus A', altName: 'كالكولس تفاضل 1 التفاضل والتكامل أ كالك سنة اولى فصل اول السنة الاولى الفصل الاول' },
  { year: 'firstYear', semester: 'First Semester', name: 'General Physics Lab A', altName: 'مختبر الفيزياء العامة أ لاب الاب سنة اولى السنة الاولى فصل اول  الفصل الاول' },
  { year: 'firstYear', semester: 'First Semester', name: 'General Physics A', altName: 'الفيزياء العامة أ فيزياء سنة اولى السنة الاولى فصل اول  الفصل الاول' },
  { year: 'firstYear', semester: 'Second Semester', name: 'General Chemistry', altName: 'الكيمياء العامة كيمياء كيمستري  سنة اولى الفصل الثاني السنة الاولى' },
  { year: 'firstYear', semester: 'Second Semester', name: 'Workshop Technology', altName: ' تقنية الورش تكنولوجيا الورش خالد الحلاق سنة اولى الفصل الثاني السنة الاولى' },
  { year: 'firstYear', semester: 'Second Semester', name: 'Introduction to Computers', altName: 'مقدمة في الحاسوب مقدمة في الكمبيوتر سنة اولى الفصل الثاني السنة الاولى' },
  { year: 'firstYear', semester: 'Second Semester', name: 'Introduction to Computers Lab', altName: 'مختبر مقدمة الحاسوب لاب الاب سنة اولى الفصل الثاني السنة الاولى' },
  { year: 'firstYear', semester: 'Second Semester', name: 'Technical English', altName: ' انجليزي تقني اللغة الإنجليزية التقنية Eng سنة اولى الفصل الثاني السنة الاولى' },
  { year: 'firstYear', semester: 'Second Semester', name: 'Calculus B', altName: ' تفاضل وتكامل كالكولس التفاضل والتكامل ب 2 سنة اولى الفصل الثاني السنة الاولى' },
  { year: 'firstYear', semester: 'Second Semester', name: 'General Physics B', altName: '  قيزياء الفيزياء العامة ب سنة اولى الفصل الثاني السنة الاولى' },

  // السنة الثانية
  { year: 'secndYear', semester: 'First Semester', name: 'Computer Programming 1', altName: 'برمجة الحاسوب 1 السنة الثانية الفصل الاول سنة ثانية فصل اول جافا ' },
  { year: 'secndYear', semester: 'First Semester', name: 'Computer Programming Lab 1', altName: 'مختبر برمجة الحاسوب 1 لاب الاب السنة الثانية الفصل الاول سنة ثانية فصل اول جافا' },
  { year: 'secndYear', semester: 'First Semester', name: 'Digital Design 1', altName: 'التصميم الرقمي 1 تصميم تجميعي السنة الثانية الفصل الاول سنة ثانية فصل اول' },
  { year: 'secndYear', semester: 'First Semester', name: 'Digital Design Lab 1', altName: 'مختبر التصميم الرقمي 1 لاب الاب تجميعي وسام عاشور السنة الثانية الفصل الاول سنة ثانية فصل اول' },
  { year: 'secndYear', semester: 'First Semester', name: 'Electric Circuits 1', altName: 'الدوائر الكهربائية 1 المحروق دواىر السنة الثانية الفصل الاول سنة ثانية فصل اول' },
  { year: 'secndYear', semester: 'First Semester', name: 'Electric Circuits Lab 1', altName: 'مختبر الدوائر الكهربائية 1 لاب الاب دواىر المحروق السنة الثانية الفصل الاول سنة ثانية فصل اول' },
  { year: 'secndYear', semester: 'Second Semester', name: 'Linear Algebra', altName: 'الجبر الخطي جبر خطي فاتن دكنورة السنة الثانية سنة ثانية الفصل الثاني فصل ثاني' },
  { year: 'secndYear', semester: 'Second Semester', name: 'Computer Programming 2', altName: 'برمجة الحاسوب 2 ربا سلامة ايمن مليحة السنة الثانية سنة ثانية الفصل الثاني فصل ثاني جافا' },
  { year: 'secndYear', semester: 'Second Semester', name: 'Computer Programming Lab 2', altName: 'مختبر برمجة الحاسوب 2 لاب الاب  السنة الثانية سنة ثانية الفصل الثاني فصل ثاني جافا' },
  { year: 'secndYear', semester: 'Second Semester', name: 'Digital Design 2', altName: 'التصميم الرقمي 2 تصميم تتابعي السنة الثانية سنة ثانية الفصل الثاني فصل ثاني' },
  { year: 'secndYear', semester: 'Second Semester', name: 'Digital Design Lab 2', altName: 'مختبر التصميم الرقمي 2 لاب الاب تتابعي السنة الثانية سنة ثانية الفصل الثاني فصل ثاني' },
  { year: 'secndYear', semester: 'Second Semester', name: 'Electronics Lab 1', altName: 'مختبر الإلكترونيات 1 لاب الكترونيات الاب السنة الثانية سنة ثانية الفصل الثاني فصل ثاني' },
  { year: 'secndYear', semester: 'Second Semester', name: 'Electronics 1', altName: 'الإلكترونيات 1 الكترونيات السنة الثانية سنة ثانية الفصل الثاني فصل ثاني' },
  { year: 'secndYear', semester: 'Second Semester', name: 'Ordinary Differential Equations', altName: ' معادلات تفاضلية ode OED المعادلات التفاضلية العادية السنة الثانية سنة ثانية الفصل الثاني فصل ثاني' },

  // السنة الثالثة
  { year: 'thirdYear', semester: 'First Semester', name: 'Discrete mathematics', altName: 'الرياضيات المتقطعة رياضيات متقطعة السنة الثالثة سنة ثالثة الفصل الاول فصل اول' },
  { year: 'thirdYear', semester: 'First Semester', name: 'Discrete mathematics Lab', altName: 'مختبر الرياضيات المتقطعة لاب مختبر متقطعة رياضيات السنة الثالثة سنة ثالثة الفصل الاول فصل اول' },
  { year: 'thirdYear', semester: 'First Semester', name: 'Data structures and algorithms', altName: ' داتا ستركشر هياكل البيانات والخوارزميات احمد مهدي  السنة الثالثة سنة ثالثة الفصل الاول فصل اول' },
  { year: 'thirdYear', semester: 'First Semester', name: 'Data structures and algorithms Lab', altName: 'مختبر هياكل البيانات والخوارزميات لاب الاب داتا ستركشر السنة الثالثة سنة ثالثة الفصل الاول فصل اول' },
  { year: 'thirdYear', semester: 'First Semester', name: 'Practical linear signals and systems', altName: 'الإشارات والأنظمة الخطية العملية اشارات سجنال لاب الاب السنة الثالثة سنة ثالثة الفصل الاول فصل اول' },
  { year: 'thirdYear', semester: 'First Semester', name: 'Linear signals and systems', altName: 'الإشارات والأنظمة الخطية اشارات سجنال السنة الثالثة سنة ثالثة الفصل الاول فصل اول' },
  { year: 'thirdYear', semester: 'First Semester', name: 'Probability and Statistics Theory', altName: 'نظرية الاحتمالات والإحصاء احتمالات احصاء السنة الثالثة سنة ثالثة الفصل الاول فصل اول' },
  { year: 'thirdYear', semester: 'Second Semester', name: 'Computer architecture', altName: 'هندسة الحاسوب حاسوب السنة الثالثة الفصل الثاني سنة ثالثة فصل ثاني' },
  { year: 'thirdYear', semester: 'Second Semester', name: 'Computer architecture Lab', altName: 'مختبر هندسة الحاسوب لاب الاب حاسوب السنة الثالثة الفصل الثاني سنة ثالثة فصل ثاني' },
  { year: 'thirdYear', semester: 'Second Semester', name: 'Database systems', altName: ' داتا بيز نظم قواعد البيانات احمد مهدي السنة الثالثة الفصل الثاني سنة ثالثة فصل ثاني' },
  { year: 'thirdYear', semester: 'Second Semester', name: 'Database systems Lab', altName: 'مختبر نظم قواعد البيانات لاب الاب السنة الثالثة الفصل الثاني سنة ثالثة فصل ثاني' },
  { year: 'thirdYear', semester: 'Second Semester', name: 'Practical digital electronics', altName: 'مختبر الإلكترونيات الرقمية لاب الاب السنة الثالثة الفصل الثاني سنة ثالثة فصل ثاني' },
  { year: 'thirdYear', semester: 'Second Semester', name: 'Digital electronics', altName: 'الإلكترونيات الرقمية رقمية الكترونيات السنة الثالثة الفصل الثاني سنة ثالثة فصل ثاني' },
  { year: 'thirdYear', semester: 'Second Semester', name: 'Linear control systems practical', altName: 'مختبر التحكم الخطي لاب الاب السنة الثالثة الفصل الثاني سنة ثالثة فصل ثاني' },
  { year: 'thirdYear', semester: 'Second Semester', name: 'Linear control systems', altName: 'أنظمة التحكم الخطي انظمة التحكم الخطي كنترول السنة الثالثة الفصل الثاني سنة ثالثة فصل ثاني' },

  // السنة الرابعة
  { year: 'fourthYear', semester: 'First Semester', name: 'Operating Systems', altName: ' نظم التشغيل  os أنظمة التشغيل انظمة التشغيل السنة الرابعة سنة رابعة فصل اول الفصل الاول' },
  { year: 'fourthYear', semester: 'First Semester', name: 'Operating Systems Lab', altName: ' os انظمة التشغيل مختبر أنظمة التشغيل لاب الاب انظمة التشغيل السنة الرابعة سنة رابعة فصل اول الفصل الاو' },
  { year: 'fourthYear', semester: 'First Semester', name: 'Data Communication', altName: 'الاتصالات البيانات اتصالات بيانات السنة الرابعة سنة رابعة فصل اول الفصل الاو' },
  { year: 'fourthYear', semester: 'First Semester', name: 'Data Communication Lab', altName: 'مختبر الاتصالات البيانات لاب الاب اتصالات  السنة الرابعة سنة رابعة فصل اول الفصل الاو' },
  { year: 'fourthYear', semester: 'First Semester', name: 'Assembly Language', altName: 'لغة التجميع تجميع امل محفوظ السنة الرابعة سنة رابعة فصل اول الفصل الاو' },
  { year: 'fourthYear', semester: 'First Semester', name: 'Assembly Language Lab', altName: 'مختبر لغة التجميع لاب الاب السنة الرابعة سنة رابعة فصل اول الفصل الاو' },
  { year: 'fourthYear', semester: 'First Semester', name: 'Practical Training 250h', altName: 'تدريب 250 ساعة ميدان ميداني السنة الرابعة سنة رابعة فصل اول الفصل الاو' },
  { year: 'fourthYear', semester: 'Second Semester', name: 'Computer Networks', altName: 'شبكات الحاسوب الشبكات شبكة السنة الرابعة سنة رابعة الفصل الثاني فصل ثاني' },
  { year: 'fourthYear', semester: 'Second Semester', name: 'Computer Networks Lab', altName: 'مختبر شبكات الحاسوب لاب الاب الشبكات السنة الرابعة سنة رابعة الفصل الثاني فصل ثاني' },
  { year: 'fourthYear', semester: 'Second Semester', name: 'Embedded Systems', altName: 'الأنظمة المدمجة انظمة مدمجة المدمجة السنة الرابعة سنة رابعة الفصل الثاني فصل ثاني' },
  { year: 'fourthYear', semester: 'Second Semester', name: 'Embedded Systems Lab', altName: 'مختبر الأنظمة المدمجة لاب الاب مدمجة انظمة السنة الرابعة سنة رابعة الفصل الثاني فصل ثاني' },
  { year: 'fourthYear', semester: 'Second Semester', name: 'VHDL', altName: ' فهدل في إتش دي إل السنة الرابعة سنة رابعة الفصل الثاني فصل ثاني' },
  { year: 'fourthYear', semester: 'Second Semester', name: 'VHDL Lab', altName: ' فهدل مختبر في إتش دي إل لاب الاب فهدل السنة الرابعة سنة رابعة الفصل الثاني فصل ثاني' },
  { year: 'fourthYear', semester: 'Second Semester', name: 'Software Engineering', altName: 'هندسة البرمجيات الهندسة برمجيات  السنة الرابعة سنة رابعة الفصل الثاني فصل ثاني' },

  // السنة الخامسة
  { year: 'fifthYear', semester: 'First Semester', name: 'AI', altName: 'الذكاء الاصطناعي ذكاء اصطياعي اصطناعي السنة الخامسة الفصل الاول سنة خامسة فصل اول' },
  { year: 'fifthYear', semester: 'First Semester', name: 'AI Lab', altName: 'مختبر الذكاء الاصطناعي لاب الاب ذكاء اصطناعي السنة الخامسة الفصل الاول سنة خامسة فصل اول' },
  { year: 'fifthYear', semester: 'First Semester', name: 'Network Security', altName: 'أمن الشبكات امن الامن شبكات شبكة السنة الخامسة الفصل الاول سنة خامسة فصل اول' },
  { year: 'fifthYear', semester: 'First Semester', name: ' Digital Image Processing', altName: 'معالجة صور رقمية DIP السنة الخامسة الفصل الاول سنة خامسة فصل اول' },
  { year: 'fifthYear', semester: 'First Semester', name: 'Network Security Lab', altName: 'مختبر أمن الشبكات لاب الاب شبكة السنة الخامسة الفصل الاول سنة خامسة فصل اول' },
  { year: 'fifthYear', semester: 'Second Semester', name: 'Security In Computer Systems', altName: 'أمن أنظمة الحاسوب امن الامن انطمة الحاسوب حاسوب السنة الخامسة الفصل الثاني سنة خامسة فصل ثاني' },
  { year: 'fifthYear', semester: 'Second Semester', name: 'Elective Course 3', altName: 'اختياري 3 خيار اختر  السنة الخامسة الفصل الثاني سنة خامسة فصل ثاني' },
  { year: 'fifthYear', semester: 'Second Semester', name: 'Elective Course 4', altName: 'اختياري 4 خيار اختر  السنة الخامسة الفصل الثاني سنة خامسة فصل ثاني' },
];



  // دالة تنظيف النصوص لتحويلها إلى id
  function normalizeText(text) {
      return text.toLowerCase().replace(/\s+/g, '').replace(/[^\w\u0600-\u06FF]/g, '');
  }

  // === 1. إنشاء IDs لكل مادة على الصفحة ===
  document.querySelectorAll('.subject-list .subject').forEach(sub => {
      sub.setAttribute('id', normalizeText(sub.textContent));
  });

  // === 2. عند تحميل الصفحة، فتح الفصل إذا تم حفظه في localStorage ===
  window.addEventListener('DOMContentLoaded', () => {
      const openSemesterId = localStorage.getItem('openSemester');
      if (openSemesterId) {
          const semester = document.getElementById(openSemesterId);
          if (semester) {
              semester.style.display = 'flex'; // فتح الفصل
          }
          localStorage.removeItem('openSemester'); // مسح المفتاح بعد الفتح
      }

      // === 3. التمرير والتركيز على المادة ===
      const hash = window.location.hash;
      if (hash) {
          const element = document.querySelector(hash);
          if (element) {
              // فتح الفصل المحتوي على المادة إذا كان مخفي
              let parentSemester = element.closest('.subject-list');
              if (parentSemester) parentSemester.style.display = 'flex';

              // التمرير والتركيز على المادة
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
              const originalBg = element.style.backgroundColor;
              element.style.backgroundColor = '#00f7ff66'; // تمييز المادة
              setTimeout(() => element.style.backgroundColor = originalBg, 9000);
          }
      }
  });

  // === 4. البحث ===
  function searchSubject() {
      const input = document.getElementById('searchInput').value.toLowerCase();
      const resultsContainer = document.getElementById('searchResults');
      resultsContainer.innerHTML = '';

      if (input === '') {
          resultsContainer.style.display = 'none';
          return;
      }

      const results = allSubjects.filter(sub =>
          sub.name.toLowerCase().includes(input) ||
          (sub.altName && sub.altName.toLowerCase().includes(input))
      );

      results.forEach(sub => {
          const div = document.createElement('div');
          div.classList.add('search-item');
          div.innerHTML = `<strong>${sub.name}</strong> - ${sub.year} - ${sub.semester}`;

          div.onclick = () => {
              const subjectId = normalizeText(sub.name);
              const semesterId = 'semester-' + normalizeText(sub.semester);

              // حفظ الفصل في localStorage ليتم فتحه بعد الانتقال
              localStorage.setItem('openSemester', semesterId);

              // الانتقال للصفحة مع التركيز على المادة
              window.location.href = sub.year + '.html#' + subjectId;
          };

          resultsContainer.appendChild(div);
      });

      resultsContainer.style.display = results.length ? 'flex' : 'none';
  }









// =====================================
// Toggle Theme Menu
// =====================================
function toggleThemeMenu() {
  const menu = document.getElementById("themeMenu");
  menu.classList.toggle("show");

  const btn = document.querySelector(".theme-btn");
  const rect = btn.getBoundingClientRect();

  // إذا قرب من يمين الشاشة → عمودي
  if (rect.right > window.innerWidth - 150) {
    menu.style.flexDirection = "column";
    menu.style.left = "auto";
    menu.style.right = "0px";
  } else {
    menu.style.flexDirection = "row";
    menu.style.left = "calc(50% - 20px)";
    menu.style.right = "auto";
  }
}

// =====================================
// Apply Theme + Save it
// =====================================
function applyTheme(theme) {
  // إزالة أي ثيم قديم
  document.body.className = document.body.className
    .split(" ")
    .filter(c => !c.startsWith("theme-"))
    .join(" ");

  if (theme) {
    document.body.classList.add(theme);

    // 🔥 حفظ الثيم
    localStorage.setItem("ui-theme", theme);
  } else {
    localStorage.removeItem("ui-theme");
  }
}

// =====================================
// Load saved theme on page load
// =====================================
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("ui-theme");

  if (savedTheme) {
    document.body.classList.add(savedTheme);
  }
});



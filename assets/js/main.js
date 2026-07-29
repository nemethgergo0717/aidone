// AI Done Kft. — main.js
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Set current year in footer
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var lang = (document.documentElement.lang || "hu").indexOf("en") === 0 ? "en" : "hu";

  // ---------- ROI calculator ----------
  var roiForm = document.querySelector("#roi-calc-form");
  if (roiForm) {
    roiForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var hours = parseFloat(document.querySelector("#roi-hours").value) || 0;
      var rate = parseFloat(document.querySelector("#roi-rate").value) || 0;
      var monthlyHours = hours * 4.33;
      var savedHours = monthlyHours * 0.4; // disclosed assumption: ~40% automatable
      var savedMoney = savedHours * rate;
      var result = document.querySelector("#roi-result");
      var hoursEl = document.querySelector("#roi-saved-hours");
      var moneyEl = document.querySelector("#roi-saved-money");

      var moneyLabel =
        lang === "en"
          ? Math.round(savedMoney).toLocaleString("en-US") + " / month (estimated)"
          : Math.round(savedMoney).toLocaleString("hu-HU") + " Ft / hó (becsült)";
      var hoursLabel =
        lang === "en"
          ? "≈ " + savedHours.toFixed(1) + " hours saved per month"
          : "≈ " + savedHours.toFixed(1).replace(".", ",") + " óra felszabadítva havonta";

      if (hoursEl) hoursEl.textContent = hoursLabel;
      if (moneyEl) moneyEl.textContent = moneyLabel;
      if (result) result.classList.add("show");
    });
  }

  // ---------- AI readiness quiz ----------
  var quizForm = document.querySelector("#quiz-form");
  if (quizForm) {
    quizForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var total = 0;
      var answered = 0;
      ["q1", "q2", "q3"].forEach(function (name) {
        var checked = quizForm.querySelector('input[name="' + name + '"]:checked');
        if (checked) {
          total += parseInt(checked.value, 10);
          answered++;
        }
      });

      var resultBox = document.querySelector("#quiz-result");
      if (!resultBox) return;

      if (answered < 3) {
        resultBox.querySelector("p").textContent =
          lang === "en"
            ? "Please answer all three questions."
            : "Kérjük, válaszoljon mind a három kérdésre.";
        resultBox.classList.add("show");
        return;
      }

      var messages = {
        hu: {
          low: "Már jó úton halad — néhány célzott automatizálás tovább növelheti a hatékonyságát.",
          mid: "Komoly, kihasználatlan potenciál van a folyamataiban — egy AI Audit valószínűleg gyors megtérülést hozna.",
          high: "Jelentős automatizálási potenciál — érdemes minél előbb egyeztetni egy ingyenes konzultáción."
        },
        en: {
          low: "You're already on a good track — a few targeted automations could boost efficiency further.",
          mid: "There's real, untapped potential in your processes — an AI Audit would likely pay off quickly.",
          high: "Significant automation potential — worth booking a free consultation as soon as possible."
        }
      };

      var tier = total <= 2 ? "low" : total <= 4 ? "mid" : "high";
      resultBox.querySelector("p").textContent = messages[lang][tier];
      resultBox.classList.add("show");
    });
  }

  // ---------- Prefill contact message from CTA links (?topic=audit|roi|quiz|consult) ----------
  var messageField = document.querySelector("#message");
  if (messageField) {
    var params = new URLSearchParams(window.location.search);
    var topic = params.get("topic");
    var prefills = {
      hu: {
        audit: "Szeretnék egy ingyenes AI Auditot kérni a vállalkozásomhoz.",
        roi: "A ROI kalkulátor alapján szeretnék egyeztetni a lehetséges megtakarításról.",
        quiz: "Kitöltöttem az AI-érettségi gyorstesztet, és szeretnék egyeztetni az eredményről.",
        consult: "Szeretnék egy ingyenes konzultációt kérni."
      },
      en: {
        audit: "I'd like to request a free AI Audit for my business.",
        roi: "Based on the ROI calculator, I'd like to discuss potential savings.",
        quiz: "I completed the AI readiness quiz and would like to discuss the result.",
        consult: "I'd like to book a free consultation."
      }
    };
    if (topic && prefills[lang][topic] && !messageField.value) {
      messageField.value = prefills[lang][topic];
    }
  }
});

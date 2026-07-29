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
                                                                            });
                                                                            

#' @importFrom shiny registerInputHandler
#' @import lubridate
#' @noRd
.onLoad <- function(...){

  shiny::registerInputHandler("shinyDatetimePicker.date", function(data, ...) {
    dt <- Sys.time()
    year(dt) <- data[["date"]][["year"]]
    month(dt) <- data[["date"]][["month"]]
    day(dt) <- data[["date"]][["date"]]
    hour(dt) <- data[["time"]][["hour"]]
    minute(dt) <- data[["time"]][["minute"]]
    second(dt) <-
      ifelse(is.null(data[["time"]][["second"]]), 0, data[["time"]][["second"]])
    dt
  }, force = TRUE)

}

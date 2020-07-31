datetime2list <- function(dt, sec){
  list(
    date = list(
      year = year(dt),
      month = month(dt),
      date = day(dt)
    ),
    time = if(sec) list(
      hour = hour(dt),
      minute = minute(dt),
      second = floor(second(dt))
    ) else list(
      hour = hour(dt),
      minute = minute(dt)
    )
  )
}

#' <Add Title>
#'
#' <Add Description>
#'
#' @importFrom shiny restoreInput
#' @importFrom reactR createReactShinyInput
#' @importFrom htmltools htmlDependency tags
#' @import lubridate
#'
#' @export
datetimePickerInput <- function(
  inputId, value = NULL,
  second = FALSE, save = FALSE)
{

  if(is.null(value)) {
    value <- Sys.time()
  }

  reactR::createReactShinyInput(
    inputId,
    "datetimePicker",
    htmltools::htmlDependency(
      name = "datetimePicker-input",
      version = "1.0.0",
      src = "www/shinyDatetimePicker/datetimePicker",
      package = "shinyDatetimePicker",
      script = "datetimePicker.js",
      stylesheet = c("Calendar.css", "TimePicker.css", "Picker.css")
    ),
    datetime2list(value, second),
    list(second = second, save = save),
    htmltools::tags$div
  )
}

#' <Add Title>
#'
#' <Add Description>
#'
#' @export
updateDatetimePickerInput <- function(session, inputId, value, configuration = NULL) {
  message <- list(value = value)
  if (!is.null(configuration)) message$configuration <- configuration
  session$sendInputMessage(inputId, message);
}

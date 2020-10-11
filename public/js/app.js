
class EventManager {
    constructor() {
        this.urlBase = "/events"
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()
    }

    obtenerDataInicial() {
        let url = this.urlBase + "/all"
        let valor = localStorage.getItem("user");
        $('.formContainer').append(`<h2> Agenda de ${valor} </h2>`)
        let eventoABuscar = {
            usuario : valor
        }
        
        $.get(url,eventoABuscar, (response) => {
            this.inicializarCalendario(response)
        })
    }

    actualizarEvento(evento){
        if(evento.end === null){
            let start = moment(evento.start).format('YYYY-MM-DD HH:mm:ss')
            let eventId = evento._id
       $.post('/events/update', {id: eventId,  start : start}, (response) => {
        alert(response)
        })
     }else{
        let start = moment(evento.start).format('YYYY-MM-DD HH:mm:ss')
        let eventId = evento._id
        let end = moment(evento.end).format('YYYY-MM-DD HH:mm:ss')
        $.post('/events/update', {id: eventId,  start : start, end: end}, (response) => {
         alert(response)
         })
     }
       
    }


    eliminarEvento(evento) {
        let eventId = evento._id
        $.post('/events/delete/'+eventId, {id: eventId}, (response) => {
            alert(response)
        })
    }

    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault()
            let nombre = $('#titulo').val(),
            start = $('#start_date').val(),
            title = $('#titulo').val(),
            end = '',
            start_hour = '',
            end_hour = '';

            if (!$('#allDay').is(':checked')) {
                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                start = start + 'T' + start_hour
                end = end + 'T' + end_hour
            }
            let url = this.urlBase + "/new"        
            if (title != "" && start != "") {
                let eUser= localStorage.getItem("user");
                let ev = {
                    user: eUser,
                    title: title,
                    start: start,
                    end: end
                }
                $.post(url, ev, (response) => {
                    alert(response);
                    
                })

                $('.calendario').fullCalendar('renderEvent', ev)
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function(){
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            }else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })
    }

    inicializarCalendario(eventos) {
        var d = moment()
        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: d  ,
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
                this.actualizarEvento(event)
            },
            events: eventos,

            eventDragStart: (event,jsEvent) => {
                $('.delete').find('img').attr('src', "./img/delete.png");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event,jsEvent) => {
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                        this.eliminarEvento(event)
                        $('.calendario').fullCalendar('removeEvents', event._id);
                    }
                }
            })
            
        }
        
    }

    const Manager = new EventManager()

    $('.logout-container').on('click', function(){
        window.location.href="http://localhost:3000/index.html"
    })

    
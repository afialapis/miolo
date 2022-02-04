echo "**** Stopping NODE ****" >> /var/log/afialapis/miolo.log
#pkill node >> /var/log/afialapis/miolo.log
kill -9 $(tail /tmp/miolo.pid) >> /var/log/afialapis/miolo.log
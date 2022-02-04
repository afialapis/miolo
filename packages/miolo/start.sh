echo "**** Running NODE ****" >> /var/log/afialapis/miolo.log
/home/devel/.npm-global/bin/npm run prod >> /var/log/afialapis/miolo.log
echo "**** NODE PID IS $(tail /tmp/miolo.pid) ****" >> /var/log/afialapis/miolo.log
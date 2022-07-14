#!/bin/bash
ipstatic()
{
echo "#############################################################################"
echo "##									 ##"
echo "##			Configuracion of IP-STATIC			 ##"
echo "##									 ##"
echo "#############################################################################"
cd /etc/netplan
echo "How many network adapter the machine have?"
read placas
if [ $placas == 1 ]
then
echo "Enter the network adapter name"
read placa
echo "Enter the ServerIP"
read ip
echo "Insert the mask: just bitcount"
echo "Example: /24"
read mask
echo "Insert GatewayIP"
read gateway
echo "How many dns the ntwork have?"
read numero_dns
sed -i '3,$d' 00-installer-config.yaml
if [ $numero_dns == 1 ]
then
echo "Insert the DNSIP"
read ip_dns
total="$ip_dns"
echo "  ethernets:
    $placa:
     dhcp4: false
     addresses: [$ip/$mask]
     gateway4: $gateway
     nameservers:
      addresses: [$total]
  version: 2
" >> 00-installer-config.yaml
elif [ $numero_dns -gt 1 ]
then
echo "Insert the DNSIP"
read total
for((k=0;k<$numero_dns-1;k++))
do
echo "Insert the DNSIP"
readip_dns
total="$total,$ip_dns"
done
echo "  ethernets:
    $placa:
     dhcp4: false
     addresses: [$ip/$mask]
     gateway4: $gateway
     nameservers:
      addresses: [$total]
  version: 2
" >> 00-installer-config.yaml
fi
fi
if [ $placas == 2 ]
then
echo "Insert the name of NAT network adapter"
read placa_nat
echo "Insert the name of Internal network adapter"
read placa_internal
sed -i '3,$d' 00-installer-config.yaml
echo "Insert the Server ip"
read ip
echo "Insert the mask : just in bitcount"
echo "Example: /24"
read mask
echo "Insert the Gateway ip"
read gateway
echo "How many Dns servers are in the network?"
read numero_dns
if [ $numero_dns == 1 ]
then
echo "Insert the Dnsip"
read ip_dns
total="$ip_dns"
echo "  ethernets:
    $placa_nat:
     dhcp4: true
    $placa_internal:
     dhcp4: false
     addresses: [$ip/$mask]
     gateway4: $gateway
     nameservers:
      addresses: [$total]
  version: 2
" >> 00-installer-config.yaml
netplan apply
elif [ $numero_dns -gt 1 ]
then
echo "Insert the Dnsip"
read total
for((k=0;k<$numero_dns-1;k++))
do
echo "Insert the dnsip"
read ip_dns
total="$total,$ip_dns"
done
echo "  ethernets:
    $placa_nat:
     dhcp4: true
    $placa_internal:
     dhcp4: false
     addresses: [$ip/$mask]
     gateway4: $gateway
     nameservers:
      addresses: [$total]
  version: 2
" >> 00-installer-config.yaml
netplan apply
fi
fi

}
dhcp()
{
echo "####################################################################"
echo "##								##"
echo "##	       		       DHCP-SERVER     			##"
echo "##								##"
echo "####################################################################"
echo "How many network adapters this machine have?"
read placas
if [ $placas == 1 ]
then
echo "Insert the network adapter name"
read placa
ip link set $placa up
fi
if [ $placas == 2 ]
then
echo "Insert the name of NAT adapter"
read placa_nat
echo "Insert the name of Internal adapter"
read placa_internal
ip link set $placa_nat up
ip link set $placa_internal down
apt-get install -y isc-dhcp-server 
ip link set $placa_nat down
ip link set $placa_internal up
fi
cd /etc/default
sed -i 's/v4=".*/v4="'$placa_internal'"/g' isc-dhcp-server
cd /etc/dhcp
echo "Insert the domain"
read dominio
sed -i 's/option domain-name ".*/option domain-name "'$dominio'";/g' dhcpd.conf
echo "How many dns server are in the network?"
read num_dns
if [ $num_dns == 1 ]
then
echo "Insert the DNSIP"
echo "example: 192.168.1.1"
read ip_dns
sed -i "s/option domain-name-servers .*/option domain-name-servers $ip_dns;/g" dhcpd.conf
else
echo "Insert the dnsip"
read total_dns_ip
for((i=0;i<$num_dns-1;i++))
do
echo "Insert the dns ip"
read ip_dns
total_dns_ip="$total_dns_ip, $ip_dns"
done
sed -i "s/option domain-name-servers .*/option domain-name-servers $total_dns_ip;/g" dhcpd.conf
fi
sed -i "/subnet /,+50d" dhcpd.conf
echo "Configurating DHCP POOLS"
echo "How many pools we need"
read dhcp_pools
for((c=0;c<$dhcp_pools;c++))
do
echo "Insert the network ip"
read ip_rede
echo "Insert mask"
echo "example: 255.255.255.0"
read mask
echo "Insert the firs ip range"
read primeiro_ip
echo "Insert the last ip range"
read ultimo_ip
echo "Insert the gateway"
echo "example:192.168.1.254"
read gateway
echo "
subnet $ip_rede netmask $mask {
	range $primeiro_ip $ultimo_ip;
	option routers $gateway;
}" >> dhcpd.conf
done
service isc-dhcp-server restart
service isc-dhcp-server status
}
dns()
{
echo "############################################################################"
echo "##									##"
echo "##				DNS - BIND 9				##"
echo "##									##"
echo "############################################################################"
echo "How many network addpaters the machine have?"
read placas
if [ $placas == 1 ]
then
echo "Insert the name of the network adapter"
read placa
ip link set $placa up
fi
if [ $placas == 2 ]
then
echo "Insert the name of Nat network adapter"
read placa_nat
echo "Insert the name of the Internal network adapter"
read placa_internal
ip link set $placa_nat up
ip link set $placa_internal down
apt-get install -y bind9 bind9utils
ip link set $placa_nat down
ip link set $placa_internal up
fi
cd /etc/bind
echo "#############Insert the domain#####################"
read dominio
echo "****************Insert the serverip****************"
echo "************Insert just the first octeto***********"
echo "************Example: 192.x.x.x *********************"
read ip1
echo "***************Insert the second octeto************"
echo "***************Example: x.168.x.x ******************"
read ip2
echo "***************Insert the Third octeto*************"
echo "**************Example: x.x.1.x *********************"
read ip3
echo "*******************Insert the fourth octeto********"
echo "****************Example: x.x.x.1 ******************"
read ip4
sed -i "/zone /,+50d" named.conf.local
echo -e 'zone "'$dominio'" IN {
	type master;
	file "/etc/bind/forward.'$dominio'";
};\n' >> named.conf.local
echo -e 'zone "'$ip3.$ip2.$ip1.'in-addr.arpa" IN {
	type master;
	file "/etc/bind/reverse.'$dominio'";
};\n' >> named.conf.local
rm -r forward.*
rm -r reverse.*
cp db.empty forward.$dominio
cp db.empty reverse.$dominio
echo "Insert the hostname"
read hostname
sed -i "s/SOA	.*/SOA	$hostname.$dominio. root.$dominio. (/g" forward.$dominio
sed -i "s/NS	.*/NS	$hostname./g" forward.$dominio
echo "@	IN	A	$ip1.$ip2.$ip3.$ip4" >> forward.$dominio
sed -i "s/SOA	.*/SOA	$hostname.$dominio. root.$dominio. (/g" reverse.$dominio
sed -i "s/NS	.*/NS	$hostname./g" reverse.$dominio
echo "@	IN	PTR	$ip1.$ip2.$ip3.$ip4" >> reverse.$dominio
echo "$ip4	IN	PTR	$hostname." >> reverse.$dominio
echo "***************** How many forwarders do you need ? *****************"
read forwarders
linhas=$forwarders
while [ $forwarders -gt 0 ]
do
echo "***************** Insert the IP of the Forwarder ******************"
read ip
if [ $forwarders -gt 1 ]
then
totalip="$totalip\t$ip;\n"
else
totalip="$totalip\t$ip;"
fi
((forwarders--))
done
sed -i "/forwarders {/,+"$((linhas+1))"c\	forwarders {\n "$totalip"\n};" named.conf.options
service bind9 restart
service bind9 status
}
dominio()
{
echo "####################################################################"
echo "##								##"
echo "##		         	AD DOMAIN			##"
echo "##			     Windows SERVER			##"
echo "##			       SCRIPT PBIS			##"
echo "##			    Join AD DOMAIN			##"
echo "##								##"
echo "####################################################################"
cd /
echo "How many Network adapters this machine have?"
read placas
if [ $placas == 1 ]
then
echo "Insert the name of network adapter"
read placa
ip link set $placa up
fi
if [ $placas == 2 ]
then
echo "Insert the name of NAT adapter"
read placa_nat
echo "Insert the name of the Internal adapter"
read placa_internal
fi
ip link set $placa_nat up
ip link set $placa_internal down
wget https://github.com/BeyondTrust/pbis-open/releases/download/9.1.0/pbis-open-9.1.0.551.linux.x86_64.deb.sh
sleep 3
echo "The machine already have ssh installed?"
echo "answer with: y or n"
read resposta
if [ $resposta == "y" ]
then
echo "Your option not to install SSH"
else
apt-get install -y ssh
fi
ip link set $placa_nat down
ip link set $placa_internal up
ln -sf /run/systemd/resolve/resolv.conf /etc/resolv.conf
chmod +x pbis-open-9.1.0.551.linux.x86_64.deb.sh
./pbis-open-9.1.0.551.linux.x86_64.deb.sh &> /dev/null
cd /opt/pbis/bin
echo " Insert the Domain "
read dominio
echo " Insert the password of Windows Server Administrator "
read -s windows_password
domainjoin-cli join $dominio Administrator $windows_password
/opt/pbis/bin/config UserDomainPrefix $dominio
/opt/pbis/bin/config AssumeDefaultDomain True
/opt/pbis/bin/config LoginShellTemplate /bin/bash
/opt/pbis/bin/config HomeDirTemplate %H/%D/%U
cd /
echo " we gona check if this machine is in the domain "
domainjoin-cli query
rm pbis-open-9.1.0.551.linux.x86.deb.sh
rm -r pbis-open-9.1.0.551.linux.x86_64.deb
echo " you want leave the domain? "
echo "answer with: y or n"
read respostas
if [ $respostas == "y" ]
then
domainjoin-cli leave
else
echo " We gona stay in this Active Directory"
domainjoin-cli query
fi
}
asterisk()
{
echo "####################################################################"
echo "##							        ##"
echo "##				Asterisk		        ##"
echo "##			      VOIP SERVER		        ##"
echo "##					   		        ##"
echo "####################################################################"
cd /
echo "How many Network adapters this machine have"
read placas
if [ $placas -eq 1 ]
then
echo "Enter the network addapter name"
read placa
ip link set $placa down
ip link set $placaup
echo "A placa foi reiniciada"
else
echo "Insira o nome da placa NAT"
read placa_nat
echo "Insira o nome da placa Internal"
read placa_internal
fi
echo "Vamos instalar o serviço"
ip link set $placa_nat up
ip link set $placa_internal down
apt install -y asterisk &> /dev/null
ip link set $placa_nat down
ip link set $placa_internal up
echo "Serviço instalado"
echo "Vamos começar a configurar"
cd /etc/asterisk
sed -i '1621,$d' sip.conf
sed -i '113,$d' users.conf
sed -i '862,$d' extensions.conf
echo "
[from-internal]" >> extensions.conf
echo "Que porta pretende utilizar para configurar o asterisk?"
read porta
echo "Quantos users pretende configura?"
read n
for((i=0;i<$n;i++))
do
echo "Insira o nome do user"
read user
total="$total&SIP/$user"
echo "Insira a password do user"
read -s secret
echo "Insira o numero que pretende usar no user"
read reg
echo "Pretende que o user tenha voicemail?(s/n)"
read opcao
echo "
[$user]
type=friend
port=$porta
username=$user
nat=yes
qualify=yes
regcontext=$reg
context=from-internal" >> sip.conf
echo "
[$user]
full name = $user
secret = $secret
hassip = yes
context = from-internal
host = dynamic" >> users.conf
echo "exten=>$user,1,Dial(SIP/$user,10)" >> extensions.conf
if [ $opcao == "s" ] || [ $opcao == "S" ]
then
echo "exten=>$user,2,Playback(vm-nobodyavail)" >> extensions.conf
else
echo "O user nao pretende voicemail"
fi
done
sip=${total:1}
echo "Insira o nome da extensao geral"
read geral
echo "exten=>$geral,1,Dial($sip,10)" >> extensions.conf
service asterisk restart
service asterisk status
}
postfix()
{
cd /
echo "How many network adapters nics has this machine?"
read nets
if [ $nets == "1" ]
then
echo "Enter the name of the Network adapter"
read net
ip link set $net up
elif [ $nets == "2" ]
then
echo "Insert the Nat netork adapter"
read nat
echo "Insert the Internal adapter"
read internal
ip link set $nat up
ip link set $internal down
fi
clear
echo "####################################################################"
echo "##								##"
echo "##		1 - Interactive Install postfix			##"
echo "##		2 - Non-Interactive Install of Postfix		##"
echo "##			3 - Configure Postfix			##"
echo "##			4 - Install thunderbird			##"
echo "##								##"
echo "####################################################################"
echo "##								##"
echo "##			Choose an option (1-4)			##"
echo "##			Press 0 to the main menu		##"
echo "##								##"
echo "####################################################################"
read option
clear
case $option in
"1")
cd /
echo "Installing Interactive Postfix"
apt-get install -y postfix
dpkg-reconfigure postfix
apt-get install -y mailutils 
apt-get install -y courier-imap 
/etc/init.d/courier-imap restart
/etc/init.d/courier-authdaemon restart
/etc/init.d/postfix restart
/etc/init.d/postfix status
echo "Postfix installed"
echo "Service will not work until is properly configured"
echo "Press enter to continue"
read next
clear
;;
"2")
echo "Installing Non-Interactive Postfix"
DEBIAN_FRONTEND=noninteractive apt-get install -y postfix
DEBIAN_FRONTEND=noninteractive apt-get install -y mailutils
DEBIAN_FRONTEND=noninteractive apt-get install -y courier-imap
echo "Postfix Installed"
echo "Service will not work until it is properly configured"
echo "Press Enter to continue"
read next
clear
;;
"3")
echo "Configuring Postfix"
cd /etc/postfix
sed -i "/myhostname =.*/,+20d" main.cf
cd /
echo "Insert the servers name"
hostname
read server
echo "Insert the Domain"
read domain
echo "myhostname = $server.$domain" >> /etc/postfix/main.cf
echo "alias_maps = hash:/etc/aliases" >> /etc/postfix/main.cf
echo "alias_database = hash:/etc/aliases" >> /etc/postfix/main.cf
echo "myorigin = /etc/mailname" >> /etc/postfix/main.cf
echo "mydestination = $domain" >> /etc/postfix/main.cf
echo "relayhost = " >> /etc/postfix/main.cf
echo "Insert the number of networks where Postfix will provide service"
read networks
for((i=0;i<$networks;i++))
do
echo "Insert the network IP"
echo "example: 192.168.1.0"
read postfix_net
echo "Insert the network mask"
echo "Example: 255.255.255.0 = /24"
echo "Write only 24"
read postfix_mask
postfix_network="$postfix_net/$postfix_mask"
postfix_networks="$postfix_networks $postfix_network"
done
echo "mynetworks =$postfix_networks" >> /etc/postfix/main.cf
echo "mailbox_size_limit = 0" >> /etc/postfix/main.cf
echo "recipient_delimiter = +" >> /etc/postfix/main.cf
echo "inet_interfaces = all" >> /etc/postfix/main.cf
echo "Will you use Ipv4 or Ipv6"
echo "1 - Ipv4 ; 2 - Ipv6"
read ip
if [ $ip == "1" ]
then
echo "inet_protocols = ipv4" >> /etc/postfix/main.cf
elif [ $ip == "2" ]
then
echo "inet_protocols = ipv6" >> /etc/postfix/main.cf
else
echo "inet_protocols = all" >> /etc/postfix/main.cf
fi
echo "home_mailbox = Maildir/" >> /etc/postfix/main.cf
maildirmake /etc/skel/Maildir
echo "Do you want create local users?"
echo "answer with: y or n"
read answer
if [ $answer == "y" ]
then
echo "How many users do you want to create?"
read users
for((c=0;c<$users;c++))
do
echo "Insert the username that you want to create"
read user
adduser $user
done
fi
ip link set $nat down
ip link set $internal up
/etc/init.d/courier-imap restart
/etc/init.d/courier-authdaemon restart
/etc/init.d/postfix restart
/etc/init.d/postfix status
echo "Postfix configures"
echo "Press Enter to Continue"
read next
clear
;;
"4")
ip link set $nat up
ip link set $internal down
apt-get install -y thunderbird &> /dev/null
ip link set $nat down
ip link set $internal up
sleep 2
;;
esac
}
samba()
{
echo "############################################################"
echo "##							##"
echo "##		       	    Samba			##"
echo "##			Partilha de pastas		##"
echo "##			   mkdir crew			##"
echo "##							##"
echo "############################################################"
cd /
echo "Quantas placas tem a maquina?"
read placas
if [ $placas -eq 1 ]
then
echo "Qual o nome da placa"
read placa
ip link set $placa down
ip link set $placa up
echo "Placa reiniciada"
elif [ $placas -eq 2 ]
then
echo "Insira o nome da placa NAT"
read placa_nat
echo "Insira o nome da placa internal"
read placa_internal
fi
echo "Vamos começar por fazer o download do SAMBA"
cd /
ip link set $placa_internal down
ip link set $placa_nat up
apt-get install  samba -y
ip link set $placa_internal up
ip link set $placa_nat down
cd /etc/samba/
sed -i '242,$d' smb.conf
echo "Insira o user onde vai criar as pastas"
read user
echo "Quantas pastas prentende criar para partilhar?"
read n
for((i=0;i<$n;i++))
do
echo "Insira o nome da pasta"
read pasta
mkdir /home/$user/$pasta
echo "Pretende que o user escreva nesta pasta?(s/n)"
read resposta
if [ $resposta == "s" ] || [ $resposta == "S" ]
then
echo "Pretende que certos users nao tenham acesso?(s/n)"
read resposta
if [ $resposta == "n" ] || [ $resposta == "n" ]
then
chmod a=rwx /home/$user/$pasta/
echo "
[$pasta]
comment = samba
path = /home/$user/$pasta
guest = ok
writeable = yes" >> smb.conf
elif [ $resposta == "s" ] || [ $resposta == "S" ]
then
echo "Insira o numero de users"
read users
for((i=0;i<$users;i++))
do
echo "Insira o nome dos users"
read nome_user
total="$total,$nome_user"
done
echo "
[$pasta]
comment = samba
path = /home/$user/$pasta
guest = ok
writeable = yes
invalid users = $total" >> smb.conf
fi
else
echo "Pretende que certos users nao tenham acesso?"
read resposta
if [ $resposta == "n" ] || [ $resposta == "N" ]
then
chmod a=rx /home/$user/$pasta/
echo "[$pasta]
comment = samba
path = /home/$user/$pasta
guest = ok" >> smb.conf
elif [ $resposta == "s" ] || [ $resposta == "S" ]
then
echo "Insira o numero de users"
read users
for((i=0;i<users;i++))
do
echo "Insira o nome do user"
read nome_user
total="$total,$nome_user"
done
echo "
[$pasta]
comment = samba
path = /home/$user/$pasta
guest = ok
invalid users = $total" >> smb.conf
fi
fi
done
service smbd restart
service nmbd restart
echo "Vamos agora configurar um user"
echo "Quantos users pretende cria?"
read users
for((i=0;i<$users;i++))
do
echo "Insira o nome do user"
read user
smbpasswd -a $user
done
echo "Samba configurado obrigado"
}
rsyslog()
{
echo "####################################################################"
echo "##								##"
echo "##				RSYSLOG				##"
echo "##								##"
echo "####################################################################"
cd /
echo "How do you wnate to configure?"
echo "1 - Server ; 2 - Client"
read resposta
case $resposta in
"1")
cd /etc
sed -i "17s/#//" rsyslog.conf
sed -i "18s/#//" rsyslog.conf
sed -i "21s/#//" rsyslog.conf
sed -i "22s/#//" rsyslog.conf
echo "How many networks exist?"
read num_redes
for((i=0;i<$num_redes;i++))
do
echo "Insert the network IP"
read ip
echo "Insert the mask"
echo "example: /24"
read mascara
iptotal="$ip/$mascara"
ip_redes="$ip_redes, $iptotal"
done
sed -i '/AllowedSender TCP, .*/,+50d' rsyslog.conf
echo "$""AllowedSender TCP, 127.0.0.1$ip_redes" >> rsyslog.conf
echo "$""template remote-incoming-logs, "'"/var/log/%HOSTNAME%/%PROGRAMNAME%.log"' >> rsyslog.conf
echo "*.* ?remote-incoming-logs" >> rsyslog.conf
echo "& ~" >> rsyslog.conf
systemctl restart rsyslog
ss -tunelp | grep 514
ufw allow 514/tpc
ufw allow 514/udp
systemctl restart rsyslog
systemctl status rsyslog
;;
"2")
cd /etc
echo "Insert the server rsyslog ip"
read ip
sed -i '/PreserveFQDN .*/,+50' rsyslog.conf
echo "$""PreserveFQDN on" >> rsyslog.conf
echo "*.* @$ip:514" >> rsyslog.conf
echo "$""ActionQueueFilename queue" >> rsyslog.conf
echo "$""ActionQueueMaxSpace 1g" >> rsyslog.conf
echo "$""ActionQueueSaveOnShutsown on" >> rsyslog.conf
echo "$""ActionQueueType LinkedList" >> rsyslog.conf
echo "$""ActionResumeRetryCount -1" >> rsyslog.conf
systemctl restart rsyslog
systemctl status rsyslog
;;
esac
}
openfire()
{
cd /
echo "How many networks interfaces are in this machine?"
read nets
if [ $nets == "1" ]
then
echo "Insert the name of the network adapter"
read net
ip link set $net up
elif [ $nets == "2" ]
then
echo "Insert the name of the Nat network adapter"
read nat
echo "Insert the name of the Internal network adapter"
read internal
ip link set $nat up
ip link set $internal down
sleep 3
clear
fi
echo "############################################################"
echo "##							##"
echo "##			1 - Install java		##"
echo "##			2 -Install mysql		##"
echo "##			3 - Install openfire		##"
echo "##		4 - Configuration of Openfire		##"
echo "##			5 - Install Spark		##"
echo "##							##"
echo "############################################################"
echo "##							##"
echo "##			Choose one option		##"
echo "##		Press 0 to return to the main menu	##"
echo "##							##"
echo "############################################################"
read option
case $option in
"1")
cd /
echo "Installing Java"
java -version
apt-get install -y default-jre &> /dev/null
echo "JAVA installed"
echo "Press enter to continue"
read next
clear
;;
"2")
cd /
echo "Installing Mysql Server"
apt-get install -y mysql-server 
echo "Mysql Server Installed"
echo "Press Enter to Continue"
read next
clear
;;
"3")
cd /
echo "Downloading openfire"
wget -q --no-check-certificate https://www.igniterealtime.org/downloadServlet?filename=openfire/openfire_4.5.3_all.deb \-O openfire.deb
dpkg -i openfire.deb
systemctl restart openfire
echo "Openfire Installed"
echo "Service will not work until it is properly configured"
echo "Press Enter to Continue"
read next
clear
;;
"4")
cd /
echo "Configuring Openfire"
echo "Insert the SQL User name that you want to create?"
read mysql_user
echo "What is the password for this user?"
read -s mysqlpass
echo "CREATE USER '$mysql_user'@'localhost' IDENTIFIED BY '$mysqlpass';\nGRANT ALL PRIVILEGES ON *.* TO '$mysql_user'@'localhost';\n flush privileges;\ncreate database openfire;" | mysql -u root
echo " You want to change the service port?"
echo "1- YES"
echo "2- NO"
read openfire_port
case $openfire_port in
"1")
echo "Insert the new port"
read new_port
cd /etc/openfire
sed -i "s#<port>.*#<port>$new_port</port>#" openfire.xml
new_sec_port=$((new_port+1))
sed -i "s#<securePort>.*#<securePort>$new_sec_port</securePort>#" openfire.xml
for i in $new_port $new_sec_port 5222 7777; do sudo ufw allow $i; done
cd /
;;
"2")
cd /etc/openfire
echo "Openfire will use the default port"
sed -i "s#<port>.*#<port>9090</port>#" openfire.xml
sed -i "s#<securePort>.*#<securePort>9091</securePort>#" openfire.xml
for i in 9090 9091 5222 7777; do sudo ufw allow $i; done
;;
esac
echo "use openfire;\nsource /usr/share/openfire/resources/database/openfire_mysql.sql;\n show tables;" | mysql -u root
systemctl restart openfire
ip link set $nat down
ip link set $internal up
echo "To continue configuration please acces the webserver"
cd /
;;
"5")
cd /
echo "Installing Spark"
echo "How many network adapters have the local machine"
read nets
if [ $nets == "1" ]
then
echo "Insert the network adapter name"
read adapter
ip link set $adapter up
elif [$nets == "2" ]
then
echo "Insert the Nat adapter name"
read nat
echo "Insert the Internal adapter name"
read internal
fi
ip link set $nat up
ip link set $internal down
wget -q https://igniterealtime.org/downloadServlet?filename=spark/spark_2.9.4.tar.gz
tar -xvf spark_2.9.4.tar.gz
cd Spark
./Spark
esac
}
nfs()
{
echo "############################################################"
echo "##							##"
echo "##			Network file system		##"
echo "##				NFS			##"
echo "##							##"
echo "############################################################"
cd /
echo "Escolha uma opção:"
echo "1-Nfs Servidor"
echo "2-NFS Cliente"
read opcao
case $opcao in
"1")
echo "Vamos começar a configurar o NFS servidor"
echo "Quantas placas tem a maquina?"
read placas
if [ $placas -eq 1 ]
then
echo "Insira o nome da placa"
read placa
ip link set $placa down
ip link set $placa up
else
echo "Insira o nome da placa NAT"
read placa_nat
echo "Insira o nome da placa Internal"
read placa_internal
fi
ip link set $placa_nat up
ip link set $placa_internal down
apt install -y nfs-kernel-server &> /dev/null
ip link set $placa_nat down
ip link set $placa_internal up
sed -i '11,$d' /etc/exports
echo "Acabou o download do NFS vamos começar a configurar"
echo "Insira o user que esta logado"
read user
echo "Insira quantas pastas pretende criar"
read n
cd /home/$user
for((i=0;i<$n;i++))
do
echo "Insira o nome da pasta"
read pasta
mkdir -m 777 $pasta
echo "Pretende partilhar esta pasta em quantas redes?"
read redes
for((j=0;j<$redes;j++))
do
echo "Insira a rede"
read net
echo "Insira a subnet(/24)"
read subnet
cd /etc/
echo "Que tipo de permissão pretende dar as pastas?(ro,rw)"
read perm
echo "Pretende que o user tenha acesso as subpastas?"
read resposta
if [ $resposta == "s" ] || [ $resposta == "S" ]
then
echo "/home/$user/$pasta		$net/$subnet($perm,subtree_check,sync)" >> exports
elif [ $resposta == "n" ] || [ $resposta == "N" ]
then
echo "/home/$user/$pasta		$net/$subnet($perm,no_subtree_check,sync)" >> exports
fi
done
cd /home/$user
done
echo "Pretende criar ficheiros nas pastas"
read resposta
while [ $resposta == "s" ]
do
ls
echo "Escolha a pasta que pretende"
read pasta
cd /home/$user/$pasta
echo "Quantos ficheiros pretende criar?"
read n
for((i=1;i<=n;i++))
do
touch teste$i.txt
done
echo "Pretende criar mais ficheiros noutras pastas?"
read resposta
done
cd /home/$user
service nfs-kernel-server restart
echo "Vamos exportar a diretoria"
exportfs -av
echo "O que está a ser partilhado: "
exportfs
echo "Configurado, vamos agora dar restart no serviço"
service nfs-kernel-server restart
service nfs-kernel-server status
;;
"2")
echo "Vamos configurar o NFS Cliente"
echo "Quantas placas tem a maquina?"
read placas
if [ $placas == "1" ]
then
echo "Insira o nome da placa"
read placa
ip link set $placa up
elif [ $placas == "2" ]
then
echo "Insira o nome da placa NAT"
read nat
echo "Insira o nome da placa Internal"
read internal
fi
ip link set $nat up
ip link set $internal down
apt-get install -y nfs-common &> dev/null
ip link set $nat down
ip link set $internal up
echo "Insira o ip do servidor"
read server
sudo showmount -e $server
echo "Pretende montar a partilha em que pasta?"
read pasta
sudo mount -t nfs $server:/ /$pasta
echo "Vamos agora montar a partilha"
sudo mount
echo "Vamos ver agora a pasta de partilha"
cd /mnt
ls
echo "Pretende fazer unmount da partilha?"
read resposta
if [ $resposta == "s" ]
then
unmount /$pasta
else
echo "A partilha continua partilhada"
fi
;;
esac
}
ftp()
{
echo "####################################################################"
echo "##								##"
echo "##				FTP				##"
echo "##								##"
echo "####################################################################"
cd /
echo "How many network adapters this machine have?"
read placas
if [ $placas == "1" ]
then
echo "Insert the name of network adapter"
read placa
ip link set $placa up
fi
if [ $placas == 2 ]
then
echo "Insert the name of NAT adapter"
read placa_nat
echo "Insert the name of Internal adapter"
read placa_internal
fi
ip link set $placa_nat up
ip link set $placa_internal down
apt-get install -y vsftpd cowsay &> /dev/null
cowsay FTP
ip link set $placa_nat down
ip link set $placa_internal up
sleep 3
cd /etc
sed -i "31s/#//" vsftpd.conf
sed -i "99s/#//" vsftpd.conf
sed -i "100s/#//" vsftpd.conf
sed -i "122s/#//" vsftpd.conf
sed -i "123s/#//" vsftpd.conf
sed -i "125s/#//" vsftpd.conf
sed -i "131s/#//" vsftpd.conf
echo "local_root=public_html
seccomp_sandbox=NO" >> vsftpd.conf
rm -r vsftpd.chroot_list
echo "How many users do you need?"
read numero
while [ $numero -gt 0 ]
do
echo "Insert the User name"
read nome
echo "$nome" >> vsftpd.chroot_list
((numero--))
done
service vsftpd restart
service vsftpd status
}
menu_option=0
clear
while [ $menu_option != "666" ]
do
echo "####################################################################"
echo "##								##"
echo "##		 Linux Bash Services Installer/Conf		##"
echo "##								##"
echo "##			    1 - Static IP			##"
echo "##			    2 - DHCP				##"
echo "##	        	    3 - DNS				##"
echo "##			    4 - PBIS				##"
echo "##			    5 - Asterisk			##"
echo "##			    6 - Postfix				##"
echo "##			    7 - Samba				##"
echo "##			    8 - Rsyslog				##"
echo "##			    9 - Openfire			##"
echo "##			   10 - NFS				##"
echo "##			   11 - FTP				##"
echo "##								##"
echo "####################################################################"
echo "##								##"
echo "##		       Choose your option! 			##"
echo "##		             					##"
echo "##		        Press 666 to quit			##"
echo "####################################################################"
read menu_option
clear
case $menu_option in
"1")
ipstatic
;;
"2")
dhcp
;;
"3")
dns
;;
"4")
dominio
;;
"5")
asterisk
;;
"6")
postfix
;;
"7")
samba
;;
"8")
rsyslog
;;
"9")
openfire
;;
"10")
nfs
;;
"11")
ftp
;;
esac
done
echo "Exiting Script"
echo "See you soon"
exec bash

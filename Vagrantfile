# encoding: utf-8
# This file originally created at http://rove.io/1bfa94ed14bcf5ff2f329e0a77584495

# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "opscode-ubuntu-12.04_chef-11.4.0"
  config.vm.box_url = "https://opscode-vm-bento.s3.amazonaws.com/vagrant/opscode_ubuntu-12.04_chef-11.4.0.box"
  config.ssh.forward_agent = true

  config.vm.network :forwarded_port, guest: 3000, host: 3000
  config.vm.network :forwarded_port, guest: 27017, host: 27018
  config.vm.network :private_network, ip: '192.168.50.50'

  # Dla niektórych przypadków wydajnościowo może pomóc wyłączenie DnsLookup (WEBrick only)
  # http://stackoverflow.com/questions/19278596/running-rails-very-slow-inside-virtual-box-ubuntu-12-04/19284483#19284483

  if !Gem.win_platform? # dla unixów ustawiamy system nfs zamiast shared folder. Znaczne zwiększenie wydajności
    config.vm.synced_folder '.', '/vagrant', nfs: true 
  end

  config.vm.provider "virtualbox" do |v|
    v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    v.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
  end

  config.vm.provision :chef_solo do |chef|
    chef.cookbooks_path = ["cookbooks"]
    chef.add_recipe :apt
    chef.add_recipe 'rvm::vagrant'
    chef.add_recipe 'rvm::system'
    chef.add_recipe 'git'
    chef.add_recipe 'mongodb::default'
    chef.add_recipe 'redis'
    chef.json = {
      :rbenv   => {
        :user_installs => [
          {
            :user   => "vagrant",
            :rubies => [
              "1.9.3-p484",
              "2.0.0-p353"
            ],
            :global => "1.9.3-p484"
          }
        ]
      },
      :git     => {
        :prefix => "/usr/local"
      },
      :mongodb => {
        :dbpath  => "/var/lib/mongodb",
        :logpath => "/var/log/mongodb",
        :port    => "27017"
      },
      :redis   => {
        :bind        => "127.0.0.1",
        :port        => "6379",
        :config_path => "/etc/redis/redis.conf",
        :daemonize   => "yes",
        :timeout     => "300",
        :loglevel    => "notice"
      }
    }
  end
end
